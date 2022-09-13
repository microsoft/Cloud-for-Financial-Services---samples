// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createMeetingServices } from './meetingActions.service'
import { IMeetingConfig, IMeetingResponse, MEETING_STATES } from './interfaces/IMeetingActionsService';
import { CANCEL_MEETING, CREATE_MEETING, DEFAULT_REQUEST_PAYLOAD, MEETINGS } from './constants';

describe('createMeetingServices', () => {
    it('should return a service with 3 actions', () => {
        const mockDelegator = vi.fn();
        const service = createMeetingServices(mockDelegator);
        expect(service).toBeDefined();
        expect(service.createMeeting).toBeDefined();
        expect(service.getBookedMeeting).toBeDefined();
        expect(service.cancelMeeting).toBeDefined();
    })

    it('createMeeting', async () => {
        const mockDelegator = vi.fn(() => ({
            MeetingType: {
                Id: '1',
                Name: 'test',
                Description: 'test',
                Notes: 'test',
            },
            StartTime: new Date(),
            EndTime: new Date(),
            IsOnline: false,
            Location: {
                Id: '1',
                Name: 'test',
                Address1: 'test',
                PostalCode: '1234'
            },
            Advisors: [
                {
                    Id: '1',
                    Name: 'test',
                }
            ],
            CustomerAdditionalNotes: 'test',
            Id: '1',
            Duration: 30,
            State: MEETING_STATES.CANCELED,
            MeetingJoinUrl: ''
        }));

        const service = createMeetingServices(mockDelegator)
        const mockInput:IMeetingConfig = {
            meetingTypeId: '1',
            startTime: new Date(),
            endTime: new Date(),
            isVirtual: false,
            id: '2',
            note: 'test',
            branchId: '4',
            advisors: [],
        }

        const data = await service.createMeeting(mockInput);

        expect(mockDelegator).toBeCalledWith({
            method: 'POST',
            fsiCallbackName: CREATE_MEETING,
            payload: {
                body: {
                    MeetingType: mockInput.meetingTypeId,
                    StartDateTime: mockInput.startTime,
                    Contact: "",
                    RequestedAdvisors: mockInput.advisors.map(advisor => advisor.id),
                    CustomerAdditionalNotes: mockInput.note,
                    IsOnlineMeeting: mockInput.isVirtual,
                    RequestedMeetingLocation: mockInput.branchId,
                },
            },
            version: DEFAULT_REQUEST_PAYLOAD.version,
        })
    });

    it('getBookedMeeting', async () => {
        const mockResponse:IMeetingResponse = {
            MeetingType: {
                Id: '1',
                Name: 'test',
                Description: 'test',
                Notes: 'test',
            },
            StartTime: new Date(),
            EndTime: new Date(),
            IsOnline: false,
            Location: {
                Id: '1',
                Name: 'test',
                Address1: 'test',
                PostalCode: '1234'
            },
            Advisors: [
                {
                    Id: '1',
                    Name: 'test',
                }
            ],
            CustomerAdditionalNotes: 'test',
            Id: '1',
            Duration: 30,
            State: MEETING_STATES.CANCELED,
            MeetingJoinUrl: ''
        }

        const mockDelegator = vi.fn(() => mockResponse);

        const service = createMeetingServices(mockDelegator);
        const data = await service.getBookedMeeting('1');
        expect(data).toEqual({
            id: mockResponse.Id,
            startTime: mockResponse.StartTime,
            endTime: mockResponse.EndTime,
            isVirtual: mockResponse.IsOnline,
            meetingTypeId: mockResponse.MeetingType.Id,
            branchId: mockResponse.Location.Id,
            agent: mockResponse.Advisors.map(advisor => ({
                id: advisor.Id,
                name: advisor.Name,
            }))[0],
            note: mockResponse.CustomerAdditionalNotes,
        });
        
        expect(mockDelegator).toBeCalledWith({
            method: 'POST',
            fsiCallbackName: MEETINGS,
            payload: {
                body: {
                    MeetingId: '1',
                },
            },
            version: DEFAULT_REQUEST_PAYLOAD.version,
        })
    });

    it('cancelMeeting', async () => {
        const mockDelegator = vi.fn(() => ({
            IsAppointmentCancelled: true,
        }));

        const service = createMeetingServices(mockDelegator)
        const data = await service.cancelMeeting({
            id: '1',
            startTime: new Date(),
            endTime: new Date(),
            isVirtual: false,
            meetingTypeId: '1',
            branchId: '1',
        });
        
        expect(mockDelegator).toBeCalledWith({
            method: 'POST',
            fsiCallbackName: CANCEL_MEETING,
            payload: {
                body: {
                    Meeting: '1'
                },
            },
            version: DEFAULT_REQUEST_PAYLOAD.version
        })
        expect(data).toEqual(true);
    });
 })