import { IChoiceGroupOption } from '@fluentui/react';

export type DateRangeSelection = {
    startDate: Date;
    endDate: Date;
    range: string;
};

export interface IDateRangeOption extends IChoiceGroupOption {
    distance: number;
    calculateRange: (startDate?: Date, endDate?: Date) => DateRangeSelection;
}