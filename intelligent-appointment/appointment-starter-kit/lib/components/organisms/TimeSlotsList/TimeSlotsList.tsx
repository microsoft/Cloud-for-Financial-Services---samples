// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { FC, useEffect, useMemo } from 'react';
import { IObjectWithKey, Selection, SelectionMode, SelectionZone, Stack, ActionButton } from '@fluentui/react';
import { TimeslotPickerService, TIMESLOT_PICKERS_EVENTS } from '../../../machines/timeSlotPicker.machine';
import { useSelector } from '@xstate/react';
import { ITimeSlot } from '../../../models/ITimeSlot';
import { TimeSlotsPerDay } from '../../molecules/TimeSlotsPerDay/TimeSlotsPerDay';
import { useTranslation } from '../../../hooks/useTranslation';
import { stepViewPaddingInline } from '../../../styles/Stack.style';
import EmptyState from '../../atoms/InfoState/EmptyState';

const selectTimeSlots = (state: { context: { timeSlots: IObjectWithKey[] } }) => state.context.timeSlots;
const selectGroupedTimeSlots = (state: { context: { groupedTimeSlots: IObjectWithKey[] } }) => state.context.groupedTimeSlots;
const selectHasMore = (state: { context: { nextPage: string } }) => state.context.nextPage;
const timeSlotsListWrapperStyles = { root: { ...stepViewPaddingInline, display: 'inline-block', marginBlockEnd: '10px' } };
export const selectSelectedTimeSlot = (state: { context: { selectedTimeSlot: IObjectWithKey } }) => state.context.selectedTimeSlot;

export const TimeSlots: FC<{ service: TimeslotPickerService }> = ({ service }) => {
    const timeSlots = useSelector(service, selectTimeSlots);
    const groupedTimeSlots = useSelector(service, selectGroupedTimeSlots);
    const nextPage = useSelector(service, selectHasMore);
    const t = useTranslation();
    const selectedTimeSlot = useSelector(service, selectSelectedTimeSlot);

    const selection = useMemo(
        () =>
            new Selection({
                onSelectionChanged: () => {
                    const selectedItem: ITimeSlot = selection.getSelection()[0] as ITimeSlot;

                    if (!selectedItem) return;

                    service.send({ type: TIMESLOT_PICKERS_EVENTS.SELECT_TIMESLOT as any, data: selectedItem });
                },
                items: timeSlots,
            }),
        [timeSlots]
    );

    const onLoadMore = () => {
        service.send(TIMESLOT_PICKERS_EVENTS.LOAD_MORE as any);
    };

    useEffect(() => {
        if (!selectedTimeSlot) return;

        selection.setKeySelected(selectedTimeSlot.key as string, true, false);
    }, [selection]);

    const GroupedTimeSlots: JSX.Element[] = groupedTimeSlots.map(group => {
        return (
            <TimeSlotsPerDay
                key={group.key as any}
                dateTime={(group as any).startTime}
                items={timeSlots as any}
                startIndex={(group as any).startIndex}
                count={((group as any).count + (group as any).startIndex) as any}
                selection={selection}
            />
        );
    });

    return (
        <Stack styles={timeSlotsListWrapperStyles} data-testid="timeslots">
            <SelectionZone selection={selection} selectionMode={SelectionMode.single} className="timeslots-selection-zone">
                {GroupedTimeSlots}
            </SelectionZone>
            {!!nextPage && (
                <ActionButton iconProps={{ iconName: 'AddTo' }} allowDisabledFocus onClick={onLoadMore}>
                    {t('MEETING_TIMESLOT_PICKER.TIMESLOT_LIST.LOAD_MORE')}
                </ActionButton>
            )}
        </Stack>
    );
};

export const TimeSlotsList: FC<{ service: TimeslotPickerService }> = ({ service }) => {
    const timeSlots = useSelector(service, selectTimeSlots);
    const isLoading = useSelector(service, state => state.context.isLoading);
    const error = useSelector(service, state => state.context.error);
    const t = useTranslation();
    
    if (!timeSlots.length && !isLoading && !error) {
        return (
        <EmptyState
            title={t('INFO_STATE.EMPTY_STATE.NO_AVAILABLE_TIMESLOT.TITLE')}
            subtitle={t('INFO_STATE.EMPTY_STATE.NO_AVAILABLE_TIMESLOT.SUBTITLE')}
        />)
    }

    return timeSlots.length ? <TimeSlots service={service} /> : null;
};
