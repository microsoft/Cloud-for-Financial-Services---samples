// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { useSelector } from '@xstate/react';
import React, { FC, useContext } from 'react';
import { Stack } from '@fluentui/react';
import { Condition } from '../../atoms/Condition';
import { useTranslation } from '../../../hooks/useTranslation';
import { TimeslotPickerService, TIMESLOT_PICKERS_EVENTS } from '../../../machines/timeSlotPicker.machine';
import { DialogManagerContext } from '../../../contexts/DialogManager/DialogManager';
import { BranchPickerModal } from '../../../modals/BranchPickerModal';
import { conditionsHeaderStyles, conditionStyles } from './TimeSlotPickerConditions.styles';
import { IParentServiceMachineService } from '../../../models/IParentMachineService';
import { MeetingTopicPickerModal } from '../../../modals/MeetingTopicPickerModal';
import DateRangePickerModal from '../../../modals/DateRangePickerModal/DateRangePickerModal';
import { toDateRangeFormat } from '../../../helpers/date.helper';
import { DateRangeSelection } from '../../atoms/DateRange/DateRange.interface';
import { IBranch } from '../../../models/IBranch';
import { IMeetingType } from '../../../models/IMeetingType';
import { IMeetingTopic } from '../../../models/IMeetingTopic';
import { setParam } from '../../../helpers/queryParams.helper';

const DateRangeCondition: FC<{ service: TimeslotPickerService }> = ({ service }) => {
    const t = useTranslation();
    const { dialogManager } = useContext(DialogManagerContext);
    const selectedRange = useSelector(service, state => state.context.selectedRange);
    const dateRangeFormat = toDateRangeFormat(selectedRange.startDate, selectedRange.endDate);
    const description = dateRangeFormat.label === 'DATE_RANGE_PICKER.DESCRIPTION_ON' ? t('MEETING_TIMESLOT_PICKER.FILTER_TIME.CLOSEST_AVAILABLE_SINGLE') : t('MEETING_TIMESLOT_PICKER.FILTER_TIME.CLOSEST_AVAILABLE');

    return (
        <Condition
            styles={conditionStyles}
            prefixLabel={t(dateRangeFormat.label)}
            description={description}
            name={dateRangeFormat.range}
            action={() =>
                dialogManager?.send({
                    type: 'OPEN_DIALOG',
                    data: {
                        Component: <DateRangePickerModal />,
                        title: t('DATE_RANGE_PICKER.HEADER'),
                        acceptButtonText: t('OK'),
                        action: (selectedDays: DateRangeSelection) =>
                            Promise.resolve(service.send({ type: 'CHANGE_DATE_RANGE', data: selectedDays })),
                        dataToSubmit: selectedRange,
                    },
                })
            }
        />
    );
};

const BranchCondition: FC<{ service: TimeslotPickerService }> = ({ service }) => {
    const t = useTranslation();
    const { dialogManager } = useContext(DialogManagerContext);
    const isVirtual = useSelector(service, state => state.context.isVirtual);
    const branch = useSelector(service, state => state.context.branch);

    return (
        <Condition
            styles={conditionStyles}
            prefixLabel={
                isVirtual ? t('MEETING_TIMESLOT_PICKER.FILTER_LOCATION.VIRTUAL_PREFIX') : t('MEETING_TIMESLOT_PICKER.FILTER_LOCATION.PREFIX')
            }
            description={
                isVirtual
                    ? t('MEETING_TIMESLOT_PICKER.FILTER_LOCATION.VIRTUAL')
                    : branch && t('MEETING_TIMESLOT_PICKER.FILTER_LOCATION.AVAILABLE_BRANCH')
            }
            name={
                isVirtual
                    ? t('MEETING_TIMESLOT_PICKER.FILTER_LOCATION.VIRTUAL_BRANCH')
                    : branch?.name || t('MEETING_TIMESLOT_PICKER.FILTER_LOCATION.SELECT_BRANCH')
            }
            action={() =>
                dialogManager?.send({
                    type: 'OPEN_DIALOG',
                    data: {
                        Component: <BranchPickerModal parentService={service as any as IParentServiceMachineService} />,
                        title: t('MEETING_BRANCH_PICKER.TITLE'),
                        acceptButtonText: t('OK'),
                        action: (data: { selectedBranch: IBranch; isVirtual?: boolean }) => {
                            if (!data) return Promise.resolve();
                            
                            setParam('branchId', data.isVirtual ? 'virtual' : (data.selectedBranch.id as string));
                            return Promise.resolve(service.send({ type: TIMESLOT_PICKERS_EVENTS.CHANGE_BRANCH as any, data }));
                        },
                    },
                })
            }
        />
    );
};

const TopicCondition: FC<{ service: TimeslotPickerService }> = ({ service }) => {
    const t = useTranslation();
    const { dialogManager } = useContext(DialogManagerContext);
    const meetingType = useSelector(service, state => state.context.meetingType);

    return (
        <Condition
            prefixLabel={t('MEETING_TIMESLOT_PICKER.FILTER_TOPIC.PREFIX')}
            name={meetingType.name}
            action={() =>
                dialogManager?.send({
                    type: 'OPEN_DIALOG',
                    data: {
                        Component: <MeetingTopicPickerModal parentService={service as any as IParentServiceMachineService} />,
                        acceptButtonText: t('OK'),
                        action: (data: { meetingType: IMeetingType; meetingTopic: IMeetingTopic }) => {
                            if (!data) return Promise.resolve();

                            setParam('meetingTypeId', data.meetingType.meetingTypeTopicId || '');
                            setParam('topicId', data.meetingTopic.id);

                            return Promise.resolve(service.send({ type: TIMESLOT_PICKERS_EVENTS.CHANGE_TOPIC as any, data }));
                        },
                        hideFooter: true,
                    },
                })
            }
        />
    );
};

export const PickerConditions: FC<{ service: TimeslotPickerService }> = ({ service }) => {
    const t = useTranslation();

    return (
        <Stack>
            <h3>{t('MEETING_TIMESLOT_PICKER.FILTER_HEADER')}</h3>
            <Stack horizontal styles={conditionsHeaderStyles}>
                <DateRangeCondition service={service} />
                <BranchCondition service={service} />
                <TopicCondition service={service} />
            </Stack>
        </Stack>
    );
};

export default PickerConditions;
