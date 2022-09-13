import { IChoiceGroupOption } from '@fluentui/react';

export type DateRangeSelection = {
    startDate: Date;
    endDate: Date;
    range: string;
};

export interface IRangeOption extends IChoiceGroupOption {
    distance: number;
    calculateRange: (startDate?: Date, endDate?: Date) => DateRangeSelection;
}

export interface IDateRangeProps {
    selectedDays: DateRangeSelection;
    rangeOptions: IRangeOption[];
    onSelectDays: (range: DateRangeSelection) => void;
}
