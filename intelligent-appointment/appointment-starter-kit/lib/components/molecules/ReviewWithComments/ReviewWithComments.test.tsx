// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { render, act, fireEvent } from '@testing-library/react';
import { mockLocations, mockMeetingTypes } from '../../../test-utils/mocks/data.mock';
import { ReviewWithComments } from './ReviewWithComments'

describe('ReviewWithComments', () => { 
    const mockBookingInfo = mockLocations[0]
    const mockMeetingType = mockMeetingTypes[0]

    it('should render the component with 3 sections', () => {
        const mockProps = {
            branch: mockBookingInfo,
            meetingType: mockMeetingType,
            meetingTopicName: 'meeting topic',
        }
        const { getByText, queryAllByTestId } = render(
            <ReviewWithComments 
                {...mockProps}
            />
        );

        expect(getByText('SCHEDULE_MEETING.HEADER')).toBeInTheDocument();
        expect(getByText(`${mockProps.meetingTopicName} / ${mockMeetingType.name}`)).toBeInTheDocument();
        expect(getByText(mockBookingInfo.name)).toBeInTheDocument();
        expect(queryAllByTestId('meeting-info-section').length).toBe(3); 
    });

    it('should render component with readonly comments', () => {
        const mockProps = {
            branch: mockBookingInfo,
            meetingType: mockMeetingType,
            meetingTopicName: 'meeting topic',
            comments: 'comments',
            isCommentReadonly: true,
        }
        const { getByText } = render(
            <ReviewWithComments 
                {...mockProps}
            />
        );

        expect(getByText('comments')).toBeInTheDocument();
    });

    it('should render component with text editor', () => {
        const mockProps = {
            branch: mockBookingInfo,
            meetingType: mockMeetingType,
            meetingTopicName: 'meeting topic',
            comments: 'comments',
        }
    });

    it('should render instructions', () => {
        const mockProps = {
            branch: mockBookingInfo,
            meetingType: mockMeetingType,
            meetingTopicName: 'meeting topic',
            comments: 'comments',
        }
        const { getByText } = render(
            <ReviewWithComments 
                {...mockProps}
            />
        );

        const instructions = mockMeetingType.customerInstructions?.split('\n') || []
        expect(getByText(instructions[0])).toBeInTheDocument();
    });

    it('should render component without any comments', () => {
        const mockProps = {
            branch: mockBookingInfo,
            meetingType: mockMeetingType,
            meetingTopicName: 'meeting topic',
        }
        const { queryByText } = render(
            <ReviewWithComments 
                {...mockProps}
            />
        );

        expect(queryByText('N/A')).toBeInTheDocument;
    });

    it('should render component with agent', () => {
        const mockProps = {
            branch: mockBookingInfo,
            meetingType: mockMeetingType,
            meetingTopicName: 'meeting topic',
            agent: {
                name: 'agent name',
                id: 'agent email',
            }
        }
        const { getByText } = render(
            <ReviewWithComments 
                {...mockProps}
            />
        );

        expect(getByText(mockProps.agent.name)).toBeInTheDocument();
    });

    it('should trigger onChange when typing comment', async () => {
        const mockProps = {
            branch: mockBookingInfo,
            meetingType: mockMeetingType,
            meetingTopicName: 'meeting topic',
            comments: 'comments',
            onCommentChange: vi.fn(),
        }
        const { getByText, getByTestId } = render(
            <ReviewWithComments 
                {...mockProps}
            />
        );

        const textarea = getByTestId('text-editor')

        expect(textarea.textContent).toEqual(mockProps.comments);

        await act(async () => {
            await fireEvent.change(textarea, { target: { value: 'new comment' } })
        })

        expect(mockProps.onCommentChange).toBeCalled();
    });
})