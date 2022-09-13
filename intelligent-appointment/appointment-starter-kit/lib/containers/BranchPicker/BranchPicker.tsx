// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { FC, useContext } from 'react';
import { useInterpret, useSelector } from '@xstate/react';
import { BranchesTable } from '../../components/molecules/BranchesTable/BranchesTable';
import { BranchSearchBox } from '../../components/atoms/BranchSearchBox/BranchSearchBox';
import { BranchTypeChoiceList } from '../../components/atoms/BranchTypeChoiceList/BranchTypeChoiceList';
import { DefaultButton, PrimaryButton, Stack, Link, IStackStyles } from '@fluentui/react';
import { BranchPickerService, BRANCH_MEETING_TYPES } from '../../machines/branchPicker.machine';
import { useTranslation } from '../../hooks/useTranslation';
import {
    branchesTableModalStyles,
    branchPickerHeaderStyles,
    branchPickerHeaderSubtitleStyles,
    branchPickerStyles,
    branchPickerTitleClassName,
    branchPickerViewStyles,
    pickerFooterGap,
    pickerFooterStyles,
    subtitleClassName,
} from './BranchPicker.style';
import { WIZARD_EVENTS } from '../../components/atoms/Wizard/Wizard';
import { MEETING_LIMITATIONS } from '../../machines/mainWizard.machine';
import { BranchPickerProps } from './BranchPicker.interface';
import { useBranch, useMeetingTopic, useMeetingType } from '../../hooks/useBookingData';
import { useBranchPickerMachine } from '../../hooks/useMachine';

const BranchPickerHeader: FC<{ service: BranchPickerService }> = ({ service }) => {
    const t = useTranslation();
    const meetingType = useSelector(service, state => state.context.meetingType);
    const meetingTopic = useSelector(service, state => state.context.meetingTopic);

    return (
        <Stack styles={branchPickerHeaderStyles}>
            <Stack horizontal styles={branchPickerHeaderSubtitleStyles}>
                <span className={subtitleClassName}>
                    {meetingTopic.name}/{meetingType.name}
                </span>
                <span>(</span>
                <Link onClick={() => service.send(WIZARD_EVENTS.PREV)}>{t('MEETING_BRANCH_PICKER.ACTIONS.CHANGE')}</Link>
                <span>)</span>
            </Stack>
            <h1 className={branchPickerTitleClassName}>{t('MEETING_BRANCH_PICKER.TITLE')}</h1>
        </Stack>
    );
};

const InPersonBranchesWithSearch: FC<{ service: BranchPickerService, styles?: IStackStyles }> = ({ service, styles }) => {
    const branchType = useSelector(service, state => state.context.branchType);

    return branchType === BRANCH_MEETING_TYPES.IN_PERSON ? (
            <Stack grow styles={styles}>
                <BranchSearchBox service={service} />
                <BranchesTable service={service} />
            </Stack>
    ) : null;
};

const BranchPickerFooter = ({ service }: { service: BranchPickerService }) => {
    const isDisabled = useSelector(service, state => !state.done && !state.can(WIZARD_EVENTS.NEXT));
    const t = useTranslation();

    return (
        <Stack styles={pickerFooterStyles} horizontal tokens={pickerFooterGap} horizontalAlign="space-between">
            <DefaultButton text={t('MEETING_BRANCH_PICKER.ACTIONS.CHANGE_TOPIC')} onClick={() => service.send(WIZARD_EVENTS.PREV)} />
            <PrimaryButton text={t('OK')} onClick={() => service.send(WIZARD_EVENTS.NEXT)} disabled={isDisabled} />
        </Stack>
    );
};

export const BranchPickerCore = ({ service, hideHeader }: { service: BranchPickerService; hideHeader?: boolean }) => {
    const tableStyles = hideHeader ? branchesTableModalStyles : undefined;
    return (
        <Stack styles={branchPickerViewStyles}>
            {!hideHeader && <BranchPickerHeader service={service as BranchPickerService} />}
            <BranchTypeChoiceList service={service as BranchPickerService} />
            <InPersonBranchesWithSearch service={service as BranchPickerService} styles={tableStyles} />
        </Stack>
    );
};

export const BranchPicker: FC<BranchPickerProps> = ({ parentService }) => {
    const branchPickerMachine = useBranchPickerMachine();
    const initialMeetingType = useMeetingType(parentService);
    const initialMeetingTopic = useMeetingTopic(parentService);
    const initialBranch = useBranch(parentService);

    const service = useInterpret(branchPickerMachine, {
        context: {
            meetingTopic: initialMeetingTopic,
            meetingType: initialMeetingType,
            selectedBranch: initialBranch,
            branchType:
                initialMeetingType.channelLimitation === MEETING_LIMITATIONS.IN_PERSON ? BRANCH_MEETING_TYPES.IN_PERSON : BRANCH_MEETING_TYPES.ONLINE,
        },
        actions: {
            onDone: context => {
                parentService.send({
                    type: 'NEXT',
                    data: {
                        branch: context.selectedBranch,
                        isVirtual: context.branchType === BRANCH_MEETING_TYPES.ONLINE,
                    },
                });
            },
            changeTopic: context => parentService.send(WIZARD_EVENTS.PREV),
        },
    }) as unknown;
    return (
        <Stack styles={branchPickerStyles}>
            <BranchPickerCore service={service as BranchPickerService} />
            <BranchPickerFooter service={service as BranchPickerService} />
        </Stack>
    );
};

export default BranchPicker;
