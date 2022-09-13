// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React from 'react';
import { render } from '@testing-library/react';
import { TimeSlotsPerDay, TITLE_FORMAT } from './TimeSlotsPerDay';
import { mockTimeSlots } from '../../../test-utils/mocks/data.mock';
import formatDistance from 'date-fns/formatDistance';
import { Selection } from '@fluentui/react';
import { toDate } from '../../../helpers/date.helper';

describe('TimeSlotsPerDay', () => {
    it('should render header and subtitle and the right amount of timeslots', () => {
        const mockProps = {
            startIndex: 0,
            count: 3,
            items: mockTimeSlots.timeslots,
            dateTime: mockTimeSlots.timeslots[0].startTime,
            selection: new Selection(),
        };

        const { container, queryByText, queryAllByTestId } = render(<TimeSlotsPerDay {...mockProps} />);

        expect(container).toBeInTheDocument();
        expect(queryByText(toDate(mockTimeSlots.timeslots[0].startTime, TITLE_FORMAT))).toBeVisible();
        expect(queryByText(formatDistance(mockTimeSlots.timeslots[0].startTime, new Date(), { addSuffix: true }))).toBeVisible();
        expect(queryAllByTestId('timeslot').length).toEqual(mockProps.count);
        expect(queryByText('MEETING_TIMESLOT_PICKER.TIMESLOT_LIST.MORNING')).toBeVisible();
        expect(queryByText('MEETING_TIMESLOT_PICKER.TIMESLOT_LIST.AFTERNOON')).toBeVisible();
    });

    it('should render list from a specific index', () => {
        const mockProps = {
            startIndex: 2,
            count: 3,
            items: mockTimeSlots.timeslots,
            dateTime: mockTimeSlots.timeslots[0].startTime,
            selection: new Selection(),
        };

        const { getAllByTestId } = render(<TimeSlotsPerDay {...mockProps} />);

        expect((getAllByTestId('timeslot')[0] as HTMLElement).dataset.selectionIndex).toEqual(`${mockProps.startIndex}`);
    });
});
