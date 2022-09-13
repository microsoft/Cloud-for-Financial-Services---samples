import React from 'react';
import { Selection } from '@fluentui/react';
import { fireEvent, render } from '@testing-library/react';
import TimeSlot, { DEFAULT_FORMAT, ITimeSlotProps } from './TimeSlot';
import { toDate } from '../../../helpers/date.helper';

describe('TimeSlot', () => {
    const mockProps: ITimeSlotProps = {
        time: new Date(),
        itemIndex: 0,
        onSelect: vi.fn(),
    };

    it('should render component', () => {
        const { container, getByTestId } = render(<TimeSlot {...mockProps} />);

        expect(container).toBeInTheDocument();
        const timeslot = getByTestId('timeslot');
        expect(timeslot).toBeVisible();
        expect(timeslot.getAttribute('data-is-selected')).toEqual('false');
    });

    it('should render component as selected', () => {
        const selection = new Selection({
            items: [
                {
                    key: 0,
                },
            ],
        });
        selection.selectToIndex(0, true);

        const props = {
            ...mockProps,
            isSelected: true,
        };
        const { getByTestId } = render(<TimeSlot {...props} />);

        expect(getByTestId('timeslot').getAttribute('data-is-selected')).toEqual('true');
    });

    it('should render component with different time format', () => {
        const props = {
            ...mockProps,
            timeFormat: 'hh:mm',
        };
        const { queryByText } = render(<TimeSlot {...props} />);
        expect(queryByText(toDate(props.time, props.timeFormat))).toBeVisible();
    });

    it('should trigger onSelect', () => {
        const { getByText } = render(<TimeSlot {...mockProps} />);

        fireEvent.click(getByText(toDate(mockProps.time, DEFAULT_FORMAT)));

        expect(mockProps.onSelect).toBeCalled();
    });
});
