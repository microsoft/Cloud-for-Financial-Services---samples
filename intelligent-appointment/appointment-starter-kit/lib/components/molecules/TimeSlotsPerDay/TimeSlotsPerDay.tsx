// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { FC, ReactElement, useMemo } from 'react';
import { Label, Text, Stack, Selection, NeutralColors, FontSizes } from '@fluentui/react';
import TimeSlot from '../../atoms/TimeSlot/TimeSlot';
import { toDate } from '../../../helpers/date.helper';
import { ITimeSlot } from '../../../models/ITimeSlot';
import { timeSlotsPerDayStyles, timeSlotsGroupStyles, sectionPeriodGap, timeSlotsPerPeriodOfDayStyles, emptyTimeSlotPerDayStyles } from './TimeSlotsPerDay.style';
import { format, formatDistanceToNow } from 'date-fns';
import { useTranslation } from '../../../hooks/useTranslation';

export const TITLE_FORMAT = 'EEEE MMMM dd, yyyy';
export interface ITimeSlotsPerDayProps {
    items: ITimeSlot[];
    startIndex: number;
    count: number;
    dateTime: Date;
    selection: Selection;
}

const TimeSlotsPerPeriodOfDay: FC<{ periodOfDayLabel: string; timeSlots: ReactElement[]; emptyLabel?: string }> = ({ periodOfDayLabel, timeSlots, emptyLabel }) => {
    return timeSlots.length ? (
        <Stack styles={timeSlotsPerPeriodOfDayStyles}>
            <span className={timeSlotsGroupStyles.sectionPeriod}>{periodOfDayLabel}</span>
            { timeSlots.length ? (
                <Stack horizontal horizontalAlign="start" data-testid="timeslots-list" className={timeSlotsGroupStyles.timeSlots}>
                    {timeSlots}
                </Stack>
            ) : (
                <Stack 
                    grow 
                    horizontal 
                    verticalAlign="center" 
                    horizontalAlign='center' 
                    styles={emptyTimeSlotPerDayStyles}
                >
                    {emptyLabel}
                </Stack>
            )
            }
        </Stack>
    ) : (
        <Stack styles={timeSlotsPerPeriodOfDayStyles}>
            <span className={timeSlotsGroupStyles.sectionPeriod}>{periodOfDayLabel}</span>
            <Stack grow horizontal verticalAlign="center" horizontalAlign='center' styles={{ root: { backgroundColor: NeutralColors.gray10, color: NeutralColors.gray90, fontSize: FontSizes.size14, padding: '15px 24px' }}}>{emptyLabel}</Stack>
        </Stack>
    );
};

export const TimeSlotsPerDay: FC<ITimeSlotsPerDayProps> = ({ selection, startIndex, count, items, dateTime }) => {
    const selectedIndex = selection.getSelectedIndices()[0];
    const t = useTranslation();

    const choices = useMemo(() => {
        const list: { morning: ReactElement[]; afternoon: ReactElement[] } = { morning: [], afternoon: [] };

        for (let i = startIndex; i < count; i++) {
            const item = items[i];
            const startTime = item.startTime;

            const timeSlot = <TimeSlot time={startTime} isSelected={selectedIndex === i} itemIndex={i} key={i} />;

            if (startTime.getHours() < 12) {
                list.morning.push(timeSlot);
            } else {
                list.afternoon.push(timeSlot);
            }
        }

        return list;
    }, [items, startIndex, count, selectedIndex]);

    const formattedDate = new Date(dateTime);

    const title = toDate(formattedDate, TITLE_FORMAT);
    const subtitle = formatDistanceToNow(formattedDate, { addSuffix: true });

    return (
        <Stack styles={timeSlotsPerDayStyles}>
            <Label id={format(dateTime, 'MMMM dd, yyyy')} className={timeSlotsGroupStyles.root}>
                <Text className={timeSlotsGroupStyles.header}>{title}</Text>
                <Text className={timeSlotsGroupStyles.subtitle}>{subtitle}</Text>
            </Label>
            <Stack horizontal tokens={sectionPeriodGap} wrap>
                <TimeSlotsPerPeriodOfDay periodOfDayLabel={t('MEETING_TIMESLOT_PICKER.TIMESLOT_LIST.MORNING')} timeSlots={choices.morning} emptyLabel={t('MEETING_TIMESLOT_PICKER.TIMESLOT_LIST.EMPTY_MORNING')}/>
                <TimeSlotsPerPeriodOfDay periodOfDayLabel={t('MEETING_TIMESLOT_PICKER.TIMESLOT_LIST.AFTERNOON')} timeSlots={choices.afternoon} emptyLabel={t('MEETING_TIMESLOT_PICKER.TIMESLOT_LIST.EMPTY_AFTERNOON')} />
            </Stack>
        </Stack>
    );
};
