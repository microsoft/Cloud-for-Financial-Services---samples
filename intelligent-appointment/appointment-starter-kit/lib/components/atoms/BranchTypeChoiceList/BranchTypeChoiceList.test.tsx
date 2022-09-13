import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { BranchTypeChoiceList } from './BranchTypeChoiceList';
import { BRANCH_MEETING_TYPES, BRANCH_PICKER_EVENTS } from '../../../machines/branchPicker.machine';
import { MEETING_LIMITATIONS } from '../../../machines/mainWizard.machine';

describe('BranchTypeChoiceList', () => {
    const fakeService = {
        send: vi.fn(),
        subscribe: () => {
            return {
                unsubscribe: () => {},
            };
        },
        state: {
            context: {
                meetingType: {
                    channelLimitation: MEETING_LIMITATIONS.ONLINE_AND_PERSON,                    
                },
                branchType: '',
            },
        },
    };

    it('renders the component correctly', () => {
        const { container } = render(<BranchTypeChoiceList service={fakeService as any} />);
        expect(container).toBeInTheDocument();
    });

    
    it('should render options list', () => {
        const { queryByRole } = render(<BranchTypeChoiceList service={fakeService as any} />);

        const groupContainer = queryByRole('radiogroup');

        expect(groupContainer).toBeVisible();

        const listWrapper = groupContainer?.lastElementChild;

        expect(listWrapper?.children.length).toBe(2);
    });

    it('should render with virtual disabled', () => {
        const mockService = {
            ...fakeService,            
            state: {
                context: {
                    meetingType: {
                        channelLimitation: MEETING_LIMITATIONS.IN_PERSON,                    
                    },
                    branchType: '',
                },
            },
        }
        const { queryByText } = render(<BranchTypeChoiceList service={mockService as any} />);

        const disabledChoice = queryByText('MEETING_BRANCH_PICKER.BRANCH_TYPES.VIRTUAL MEETING_BRANCH_PICKER.BRANCH_TYPES.DISABLED');

        const label = disabledChoice?.closest('label');
        const inputField = label?.previousElementSibling;

        expect((inputField as HTMLInputElement).disabled).toEqual(true);
    });

    it('should render with in person disabled', () => {
        const mockService = {
            ...fakeService,            
            state: {
                context: {
                    meetingType: {
                        channelLimitation: MEETING_LIMITATIONS.ONLINE,                    
                    },
                    branchType: '',
                },
            },
        }
        const { queryByText } = render(<BranchTypeChoiceList service={mockService as any} />);

        const disabledChoice = queryByText('MEETING_BRANCH_PICKER.BRANCH_TYPES.PHYSICAL MEETING_BRANCH_PICKER.BRANCH_TYPES.DISABLED');

        const label = disabledChoice?.closest('label');
        const inputField = label?.previousElementSibling;

        expect((inputField as HTMLInputElement).disabled).toEqual(true);
    });
    
    it('should render with selected topic', () => {
        const mockService = {
            ...fakeService,            
            state: {
                context: {
                    meetingType: {
                        channelLimitation: MEETING_LIMITATIONS.ONLINE,                    
                    },
                    branchType: BRANCH_MEETING_TYPES.ONLINE,
                },
            },
        }
        const { queryByText } = render(<BranchTypeChoiceList service={mockService as any} />);

        const onlineChoice = queryByText('MEETING_BRANCH_PICKER.BRANCH_TYPES.VIRTUAL');

        const label = onlineChoice?.closest('label');
        const inputField = label?.previousElementSibling;

        expect((inputField as HTMLInputElement).checked).toEqual(true);
    });

    
    it('should render without selected topic', () => {
        const { queryByRole } = render(<BranchTypeChoiceList service={fakeService as any} />);

        const groupContainer = queryByRole('radiogroup');

        const inputs = groupContainer?.querySelectorAll('input:checked');
        expect(inputs?.length).toBe(0);
    });

    it('should trigger send when making a choice', () => {
        const { queryByRole } = render(<BranchTypeChoiceList service={fakeService as any} />);

        const groupContainer = queryByRole('radiogroup');

        const inputs = groupContainer?.getElementsByTagName('input');

        inputs?.item(0)?.click();

        expect(fakeService.send).toHaveBeenCalledWith({ type: BRANCH_PICKER_EVENTS.CHANGE_BRANCH_TYPE, data: BRANCH_MEETING_TYPES.ONLINE });
    });
})
