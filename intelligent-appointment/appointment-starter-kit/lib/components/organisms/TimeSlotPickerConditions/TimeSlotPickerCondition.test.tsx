// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { act, fireEvent, render } from '@testing-library/react';
import { DialogManagerContext } from '../../../contexts/DialogManager/DialogManager';
import { dateRanges, toDateRangeFormat } from '../../../helpers/date.helper';
import { PickerConditions,  } from './TimeSlotPickerConditions';

describe('TimeSlotPickerConditions', () => {     
    const mockServ = {
        send: vi.fn(),
        subscribe: () => {
            return {
                unsubscribe: () => {},
            };
        },
        state: {
            context: {
                meetingType: {
                    name: 'test',
                    id: 'test',
                    meetingTypeTopicId: 'test-topic',
                },
                meetingTopic: {
                    id: 'topic-id',
                    name: 'topic-name',
                },
                branch: {
                    id: 'branch-id',
                    name: 'branch-name',
                },
                isVirtual: false,
                selectedRange: dateRanges.nextMonth.calculateRange()
            }
        }
    };

    it('should render the component', () => {
        const { container, getByText } = render(
            <PickerConditions 
                service={mockServ as any}
            />
        );

        expect(container).toBeInTheDocument();
        expect(getByText('MEETING_TIMESLOT_PICKER.FILTER_HEADER')).toBeInTheDocument();
        expect(getByText('MEETING_TIMESLOT_PICKER.FILTER_TIME.CLOSEST_AVAILABLE')).toBeInTheDocument();
        expect(getByText('MEETING_TIMESLOT_PICKER.FILTER_LOCATION.PREFIX')).toBeInTheDocument();
        expect(getByText('MEETING_TIMESLOT_PICKER.FILTER_LOCATION.AVAILABLE_BRANCH')).toBeInTheDocument();
        expect(getByText('branch-name')).toBeInTheDocument();
    });

    it('should render the component with virtual meeting', () => {
        const service = {
            ...mockServ,
            state: {
                ...mockServ.state,
                context: {
                    ...mockServ.state.context,
                    isVirtual: true,
                },
            },
        };

        const { queryByText } = render(
            <PickerConditions 
                service={service as any}
            />
        );

        expect(queryByText('MEETING_TIMESLOT_PICKER.FILTER_LOCATION.VIRTUAL_PREFIX')).toBeInTheDocument();
        expect(queryByText('MEETING_TIMESLOT_PICKER.FILTER_LOCATION.VIRTUAL')).toBeInTheDocument();
        expect(queryByText('MEETING_TIMESLOT_PICKER.FILTER_LOCATION.VIRTUAL_BRANCH')).toBeInTheDocument();
    });

    it('should render the component with virtual meeting', () => {
        const service = {
            ...mockServ,
            state: {
                ...mockServ.state,
                context: {
                    ...mockServ.state.context,
                    branch: undefined,
                },
            },
        };

        const { queryByText } = render(
            <PickerConditions 
                service={service as any}
            />
        );

        expect(queryByText('MEETING_TIMESLOT_PICKER.FILTER_LOCATION.SELECT_BRANCH')).toBeInTheDocument();
    });

    it('should trigger Date Time', async () => {
        const dialogService = {
            send: vi.fn(),
            subscribe: () => {
                return {
                    unsubscribe: () => {},
                };
            },
            state: {}
        }

        const { getByText } = render(
            <DialogManagerContext.Provider value={{ dialogManager: dialogService as any }}>
                <PickerConditions
                    service={mockServ as any}
                />
            </DialogManagerContext.Provider>
        );

        const range = toDateRangeFormat(mockServ.state.context.selectedRange.startDate, mockServ.state.context.selectedRange.endDate)

        await act(async () => {
            await fireEvent.click(getByText(range.range));
        });

        expect(dialogService.send).toBeCalled();
    });

    it('should trigger open Location dialog', async () => {
        const dialogService = {
            send: vi.fn(),
            subscribe: () => {
                return {
                    unsubscribe: () => {},
                };
            },
            state: {}
        }

        const { getByText } = render(
            <DialogManagerContext.Provider value={{ dialogManager: dialogService as any }}>
                <PickerConditions
                    service={mockServ as any}
                />
            </DialogManagerContext.Provider>
        );

        await act(async () => {
            await fireEvent.click(getByText(mockServ.state.context.branch.name));
        });

        expect(dialogService.send).toBeCalled();
    });

    it('should trigger open Meeting type dialog', async () => {
        const dialogService = {
            send: vi.fn(),
            subscribe: () => {
                return {
                    unsubscribe: () => {},
                };
            },
            state: {}
        }

        const { getByText } = render(
            <DialogManagerContext.Provider value={{ dialogManager: dialogService as any }}>
                <PickerConditions
                    service={mockServ as any}
                />
            </DialogManagerContext.Provider>
        );
        
        await act(async () => {
            await fireEvent.click(getByText(mockServ.state.context.meetingType.name));
        });

        expect(dialogService.send).toBeCalled();
    });
});