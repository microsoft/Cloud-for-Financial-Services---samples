// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { addDays, endOfMonth, nextMonday, startOfMonth, lastDayOfWeek  } from 'date-fns';
import { DateRangeSelection, IRangeOption } from '../../components/atoms/DateRange/DateRange.interface';

export const dateRanges = {
    thisWeek: {
        key: 'thisWeek',
        text: 'DATE_RANGE_PICKER.RANGE_OPTIONS.THIS_WEEK',
        distance: 5,
        calculateRange(): DateRangeSelection {
            const today = new Date();
            const endOfTheWeek = lastDayOfWeek(today);

            return {
                startDate: today,
                endDate: endOfTheWeek,
                range: this.key,
            };
        },
    },
    nextWeek: {
        key: 'nextWeek',
        text: 'DATE_RANGE_PICKER.RANGE_OPTIONS.NEXT_WEEK',
        distance: 5,
        calculateRange(): DateRangeSelection {
            const today = new Date();
            const monday = nextMonday(today);
            const endOfTheWeek = lastDayOfWeek(monday);

            return {
                startDate: today,
                endDate: endOfTheWeek,
                range: this.key,
            };
        },
    },
    nextMonth: {
        key: 'nextMonth',
        text: 'DATE_RANGE_PICKER.RANGE_OPTIONS.NEXT_MONTH',
        distance: 30,
        calculateRange(): DateRangeSelection {
            const today = new Date();
            const nextMonth = startOfMonth(addDays(today, 30));
            const endOfNextMonth = endOfMonth(nextMonth);

            return {
                startDate: nextMonth,
                endDate: endOfNextMonth,
                range: this.key,
            };
        },
    },
    customRange: {
        key: 'customRange',
        text: 'DATE_RANGE_PICKER.RANGE_OPTIONS.CUSTOM_RANGE',
        distance: 0,
        calculateRange(startDate?: Date, endDate?: Date) {
            return {
                startDate: startDate || new Date(),
                endDate: endDate || new Date(),
                range: this.key,
            };
        },
    },
} as const;

export const rangeOptions = Object.values(dateRanges) as IRangeOption[];
