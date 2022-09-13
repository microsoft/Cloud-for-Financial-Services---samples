import { Separator, Stack, DayOfWeek, Calendar, ICalendarProps, ChoiceGroup, IChoiceGroupOption } from '@fluentui/react';
import React, { FC, FormEvent } from 'react';
import { IDateRangeProps, IRangeOption } from './DateRange.interface';
import { CalendarStyles, DateRangeStyles, dateRangeHeaderStyleClass, dateRangeWrapperStyles, calendarHeaderClass } from './DateRange.styles';
import { useTranslation } from '../../../hooks/useTranslation';
import { dateRanges, toDateRangeFormat } from '../../../helpers/date.helper';

export const WORK_WEEK = [DayOfWeek.Monday, DayOfWeek.Tuesday, DayOfWeek.Wednesday, DayOfWeek.Thursday, DayOfWeek.Friday];

export const DEFAULT_CALENDAR_PROPS = {
    styles: { dayIsToday: { backgroundColor: 'transparent', color: 'inherit', fontWeight: 'inherit' } },
};

export const CalendarWrapper: FC<ICalendarProps & { header: string }> = ({ header, ...props }) => {
    return (
        <div>
            <span className={calendarHeaderClass}>{header}</span>
            <Calendar
                showMonthPickerAsOverlay
                firstDayOfWeek={DayOfWeek.Monday}
                showGoToToday={false}
                workWeekDays={WORK_WEEK}
                styles={CalendarStyles}
                calendarDayProps={DEFAULT_CALENDAR_PROPS}
                {...props}
            />
        </div>
    );
};

export const DateRange: FC<IDateRangeProps> = ({ selectedDays, rangeOptions, onSelectDays }) => {
    const t = useTranslation();

    const onSelectStartDate = (date: Date) => {
        onSelectDays(dateRanges.customRange.calculateRange(date, selectedDays.endDate));
    };

    const onSelectEndDate = (date: Date) => {
        onSelectDays(dateRanges.customRange.calculateRange(selectedDays.startDate, date));
    };

    const onSelectRange = (_?: FormEvent, selected?: IChoiceGroupOption) => {
        if (!selected) return;

        const newRange = (selected as IRangeOption).calculateRange(selectedDays.startDate, selectedDays.endDate);
        onSelectDays(newRange);
    };

    const rangeTextFormat = toDateRangeFormat(selectedDays.startDate, selectedDays.endDate);

    return (
        <Stack>
            <h3 className={dateRangeHeaderStyleClass}>
                {t(rangeTextFormat.label)}: {rangeTextFormat.range}
            </h3>
            <Stack horizontal horizontalAlign="start" styles={dateRangeWrapperStyles}>
                <ChoiceGroup
                    options={rangeOptions as unknown as IChoiceGroupOption[]}
                    selectedKey={selectedDays.range}
                    onChange={onSelectRange}
                    className={DateRangeStyles.rangeOptions}
                />
                <Separator vertical />
                <Stack horizontal horizontalAlign="start">
                    <CalendarWrapper
                        header={t('DATE_RANGE_PICKER.START_DATE')}
                        onSelectDate={onSelectStartDate}
                        minDate={new Date()}
                        maxDate={selectedDays.endDate}
                        value={selectedDays.startDate}
                    />
                    <CalendarWrapper
                        header={t('DATE_RANGE_PICKER.END_DATE')}
                        onSelectDate={onSelectEndDate}
                        minDate={selectedDays.startDate}
                        value={selectedDays.endDate}
                    />
                </Stack>
            </Stack>
        </Stack>
    );
};
