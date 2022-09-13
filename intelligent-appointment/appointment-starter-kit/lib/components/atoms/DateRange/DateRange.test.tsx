// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React from 'react';
import { render } from '@testing-library/react';
import { DateRange } from './DateRange';
import { rangeOptions, toDateRangeFormat } from '../../../helpers/date.helper';

describe('DateRange', () => {
    const mockProps = {
        selectedDays: {
            startDate: new Date('2020-01-01'),
            endDate: new Date('2020-02-02'),
            range: 'customRange',
        },
        rangeOptions: rangeOptions,
        onSelectDays: vi.fn()
    }
    it('renders the component correctly', () => {
        const { queryByRole, queryByText, queryByTestId } = render(<DateRange {...mockProps} />);

        const groupContainer = queryByRole('radiogroup');

        expect(groupContainer).toBeVisible();

        const listWrapper = groupContainer?.lastElementChild;

        expect(listWrapper?.children.length).toBe(rangeOptions.length);

        const format = toDateRangeFormat(mockProps.selectedDays.startDate, mockProps.selectedDays.endDate);
        expect(queryByText(`${format.label}: ${format.range}`)).toBeInTheDocument()
        expect(queryByText('DATE_RANGE_PICKER.START_DATE')).toBeVisible()
        expect(queryByText('DATE_RANGE_PICKER.END_DATE')).toBeVisible()
    }); 

    
    it('should trigger onSelectDays when making a choice', () => {
        const { queryByRole } = render(<DateRange {...mockProps} />);

        const groupContainer = queryByRole('radiogroup');

        const inputs = groupContainer?.getElementsByTagName('input');

        inputs?.item(0)?.click();

        expect(mockProps.onSelectDays).toHaveBeenCalled();
    });

});