// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { render } from '@testing-library/react';
import { mockTimeSlots } from '../../../test-utils/mocks/data.mock';
import { TimeSlotsList } from './TimeSlotsList';

describe('TimeSlotsList', () => { 
    const mockServ = {
        send: vi.fn(),
        subscribe: () => {
            return {
                unsubscribe: () => {},
            };
        },
        state: {
            context: {
                timeSlots: []
            }
        }       
    }

    it('should render Empty State if no timeslot and not in loading or error', () => {
        const { container, getByText } = render(
            <TimeSlotsList
                service={mockServ as any}
            />
        );
        expect(container).toBeInTheDocument();
        expect(getByText('INFO_STATE.EMPTY_STATE.NO_AVAILABLE_TIMESLOT.TITLE')).toBeInTheDocument();
        expect(getByText('INFO_STATE.EMPTY_STATE.NO_AVAILABLE_TIMESLOT.SUBTITLE')).toBeInTheDocument();
    });

    it('should render null if in loading and no timeslot', () => {
        const mockServ2 = {
            ...mockServ,
            state: {
                ...mockServ.state,
                context: {
                    timeSlots: [],
                    isLoading: true,
                }
            }
        }
        const { container } = render(
            <TimeSlotsList
                service={mockServ2 as any}
            />
        );
        expect(container.textContent).toEqual('');
    });

    it('should render null if in error and no timeslot', () => {
        const mockServ2 = {
            ...mockServ,
            state: {
                ...mockServ.state,
                context: {
                    ...mockServ.state.context,
                    error: true,
                }
            }
        }
        const { container } = render(
            <TimeSlotsList
                service={mockServ2 as any}
            />
        );
        expect(container.textContent).toEqual('');
    });

    it('should render timeslots with Load More', () => {
        const service = {
            ...mockServ,
            state: {
                ...mockServ.state,
                context: {
                    ...mockServ.state.context,
                    timeSlots: mockTimeSlots.timeslots,
                    groupedTimeSlots: [],
                    nextPage: true,
                }
            }
        }
        const { queryByText, queryByTestId, debug } = render(
            <TimeSlotsList
                service={service as any}
            />
        );

        debug()
        expect(queryByText('INFO_STATE.EMPTY_STATE.NO_AVAILABLE_TIMESLOT.TITLE')).toBeNull();
        expect(queryByText('INFO_STATE.EMPTY_STATE.NO_AVAILABLE_TIMESLOT.SUBTITLE')).toBeNull();
        expect(queryByTestId('timeslots')).toBeInTheDocument();
        expect(queryByText('MEETING_TIMESLOT_PICKER.TIMESLOT_LIST.LOAD_MORE')).toBeInTheDocument();
    })

    it('should render timeslots without load more', () => {
        const mockServ2 = {
            ...mockServ,
            state: {
                ...mockServ.state,
                context: {
                    ...mockServ.state.context,
                    timeSlots: mockTimeSlots.timeslots,
                    groupedTimeSlots: [],
                }
            }
        }
        const { queryByText, queryByTestId } = render(
            <TimeSlotsList
                service={mockServ2 as any}
            />
        );
        expect(queryByTestId('timeslots')).toBeInTheDocument();
        expect(queryByText('MEETING_TIMESLOT_PICKER.TIMESLOT_LIST.LOAD_MORE')).toBeNull();
    })
})