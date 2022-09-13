import { dateRanges, toDateRangeFormat, toDayAndMonth, toFullDayAndYear, toShortDayAndMonth } from './date.helper'
import { nextMonday, lastDayOfWeek, startOfMonth, addDays, endOfMonth } from 'date-fns'

describe('date.helper', () => { 
    it('should return next week', () => {
        const range = dateRanges.nextWeek.calculateRange();

        const monday = nextMonday(new Date())
        expect(range.startDate.getDate()).toEqual(monday.getDate());
        expect(range.endDate.getDate()).toEqual(lastDayOfWeek(monday).getDate());
        expect(range.range).toEqual('nextWeek');
    })
    
    it('should return next month', () => {
        const range = dateRanges.nextMonth.calculateRange();
        const nextMonth = startOfMonth(addDays(new Date(), 30))
        expect(range.startDate).toEqual(nextMonth);
        expect(range.endDate).toEqual(endOfMonth(nextMonth));
        expect(range.range).toEqual('nextMonth');
    })

    it('should return custom range', () => {
        const monday = nextMonday(new Date())
        const range = dateRanges.customRange.calculateRange(new Date(), monday);
        expect(range.startDate).toEqual(new Date());
        expect(range.endDate).toEqual(monday);
        expect(range.range).toEqual('customRange');
    });  
    
    it('should convert to a full date and year', () => {
        const date = new Date(2022, 1, 1);
        const fullDate = toFullDayAndYear(date);
        expect(fullDate).toEqual('Tuesday, February 01, 2022');
    });

    it('should convert to a full date and month', () => {
        const date = new Date(2022, 1, 1);
        const fullDate = toDayAndMonth(date);
        expect(fullDate).toEqual('Tue, February 01');
    });

    describe('toDateRangeFormat', () => { 
        it('should return same day format', () => {
            const date = new Date();

            const format = toDateRangeFormat(date, date);

            expect(format.label).toEqual('DATE_RANGE_PICKER.DESCRIPTION_ON');
            expect(format.range).toEqual(toDayAndMonth(date));
        })

        it('should return range format', () => {
            const date = new Date();
            const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);

            const format = toDateRangeFormat(startDate, date);

            expect(format.label).toEqual('DATE_RANGE_PICKER.DESCRIPTION_BETWEEN');
            expect(format.range).toEqual(`${toShortDayAndMonth(startDate)} - ${toShortDayAndMonth(date)}`);
        })
     })
})