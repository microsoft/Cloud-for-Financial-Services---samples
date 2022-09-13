import React, { FC } from 'react';
import { useSelector } from '@xstate/react';
import { BranchPickerService, BRANCH_MEETING_TYPES, BRANCH_PICKER_EVENTS } from '../../../machines/branchPicker.machine';
import { useTranslation } from '../../../hooks/useTranslation';
import { MEETING_LIMITATIONS } from '../../../machines/mainWizard.machine';
import { OnSelectFunc } from '../../molecules/TopicCardChoiceGroup';
import { ChoiceGroup, FontWeights } from '@fluentui/react';

const ChoiceListStyles = {
    label: {
        fontWeight: FontWeights.regular,
    },
    root: {
        marginBottom: '30px',
    },
};

export const BranchTypeChoiceList: FC<{ service: BranchPickerService }> = ({ service }) => {
    const t = useTranslation();
    const isVirtualDisabled = useSelector(service, state => state.context.meetingType.channelLimitation === MEETING_LIMITATIONS.IN_PERSON);
    const defaultBranchTypeSelect = useSelector(service, state => state.context.branchType);
    const isInPersonDisabled = useSelector(service, state => state.context.meetingType.channelLimitation === MEETING_LIMITATIONS.ONLINE);

    const options = [
        {
            key: BRANCH_MEETING_TYPES.ONLINE,
            text: `${t('MEETING_BRANCH_PICKER.BRANCH_TYPES.VIRTUAL')} ${isVirtualDisabled ? t('MEETING_BRANCH_PICKER.BRANCH_TYPES.DISABLED') : ''}`,
            disabled: isVirtualDisabled,
        },
        {
            key: BRANCH_MEETING_TYPES.IN_PERSON,
            text: `${t('MEETING_BRANCH_PICKER.BRANCH_TYPES.PHYSICAL')} ${isInPersonDisabled ? t('MEETING_BRANCH_PICKER.BRANCH_TYPES.DISABLED') : ''}`,
            disabled: isInPersonDisabled,
        },
    ];

    const onSelect: OnSelectFunc = (_, selected) => {
        if (!selected) return;

        service.send({ type: BRANCH_PICKER_EVENTS.CHANGE_BRANCH_TYPE as any, data: selected.key });
    };

    return <ChoiceGroup defaultSelectedKey={defaultBranchTypeSelect} options={options} onChange={onSelect} styles={ChoiceListStyles} />;
};
