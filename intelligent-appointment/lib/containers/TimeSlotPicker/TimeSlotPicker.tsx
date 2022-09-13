import { useActor, useInterpret } from '@xstate/react';
import React, { FC } from 'react';
import { Stack, PrimaryButton, IStackStyles } from '@fluentui/react';
import { useTranslation } from '../../hooks/useTranslation';
import { TimeSlotPickerContext, TimeslotPickerService } from '../../machines/timeSlotPicker.machine';
import { stepViewStyles } from '../../styles/Stack.style';
import { TimeSlotsList } from '../../components/organisms/TimeSlotsList/TimeSlotsList';
import { timePickerHeaderStyles, timeSlotsListContainerStyles } from './TimeSlotPicker.styles';
import { pickerFooterGap, pickerFooterStyles } from '../BranchPicker/BranchPicker.style';
import { WIZARD_EVENTS } from '../../components/atoms/Wizard/Wizard';
import { IParentServiceMachineService } from '../../models/IParentMachineService';
import PickerConditions from '../../components/organisms/TimeSlotPickerConditions/TimeSlotPickerConditions';
import { useTimeSlotPickerMachine } from '../../hooks/useMachine';
import { ContextualWrapper } from '../../components/atoms/ContextualWrapper/ContextualWrapper';

const TimeSlotPickerFooter = ({ service }: { service: TimeslotPickerService }) => {
    const [state, send] = useActor(service);
    const t = useTranslation();

    return (
        <Stack styles={pickerFooterStyles} horizontal tokens={pickerFooterGap} horizontalAlign="end">
            <PrimaryButton text={t('NEXT')} onClick={() => send(WIZARD_EVENTS.NEXT)} disabled={!state.done && !state.context.selectedTimeSlot} />
        </Stack>
    );
};

export const TimeSlotPicker: FC<{ parentService: IParentServiceMachineService }> = ({ parentService }) => {
    const t = useTranslation();
    const [state] = useActor(parentService);
    const timeSlotPickerMachine = useTimeSlotPickerMachine();
    const service = useInterpret(timeSlotPickerMachine, {
        context: {
            meetingTopic: state.context.meetingTopic,
            meetingType: state.context.meetingType,
            branch: state.context.branch,
            isVirtual: state.context.isVirtual,
            selectedTimeSlot: state.context.timeSlot,
        },
        actions: {
            onDone: (context: TimeSlotPickerContext) => {
                parentService.send({
                    type: 'NEXT',
                    data: {
                        timeSlot: context.selectedTimeSlot,
                        meetingTopic: context.meetingTopic,
                        meetingType: context.meetingType,
                        branch: context.branch,
                        isVirtual: context.isVirtual,
                    },
                });
            },
        },
    });

    return (
        <Stack styles={stepViewStyles} verticalAlign="space-between">
            <Stack styles={timePickerHeaderStyles}>
                <PickerConditions service={service as unknown as TimeslotPickerService} />
                <h3>{t('MEETING_TIMESLOT_PICKER.TIMESLOT_LIST.HEADER')}</h3>
            </Stack>
            <Stack styles={timeSlotsListContainerStyles as IStackStyles}>
                <TimeSlotsList service={service as unknown as TimeslotPickerService} />
                <ContextualWrapper service={service as any} />
            </Stack>
            <TimeSlotPickerFooter service={service as unknown as TimeslotPickerService} />
        </Stack>
    );
};
