import { addDays, endOfMonth, nextMonday, startOfMonth, lastDayOfWeek, format, isSameDay } from 'date-fns';
import { DateRangeSelection, IDateRangeOption } from '../models/IDateRangeOption';

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
                startDate: monday,
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

export const rangeOptions = Object.values(dateRanges) as IDateRangeOption[];

export const toDate = (date: Date, formatPattern = 'hh:mm aa', options?: Object): string => {
    return format(date, formatPattern, options);
};

export const toFullDayAndYear = (date: Date, options?: Object): string => {
    return format(date, 'EEEE, MMMM dd, yyyy', options);
};

export const toDayAndMonth = (date: Date, options?: Object): string => {
    return format(date, 'EEE, MMMM dd', options);
};

export const toShortDayAndMonth = (date: Date, options?: Object): string => {
    return format(date, 'MMMM dd', options);
};

export const toDateRangeFormat = (startDate: Date, endDate: Date): { label: string; range: string } => {
    const isSameSelectedDay = isSameDay(startDate, endDate);
    const label = isSameSelectedDay ? 'DATE_RANGE_PICKER.DESCRIPTION_ON' : 'DATE_RANGE_PICKER.DESCRIPTION_BETWEEN';
    const range = isSameSelectedDay ? toDayAndMonth(startDate) : `${toShortDayAndMonth(startDate)} - ${toShortDayAndMonth(endDate)}`;
    return { label, range };
};
