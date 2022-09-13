// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createBookingResourceService } from './bookingResources.service'
import { mockTimeSlots } from '../test-utils/mocks/data.mock';
import { ADVISORS, DEFAULT_REQUEST_PAYLOAD, GET_TIMESLOTS } from './constants';

describe('createBookingResourceService', () => {
    it('should return a service with 1 actions', () => {
        const mockDelegator = vi.fn();
        const service = createBookingResourceService(mockDelegator);
        expect(service).toBeDefined();
        expect(service.getTimeSlots).toBeDefined();
    })

    it('getTimeSlots', async () => {
        const mockDelegator = vi.fn(() => ({
            TimeSlots: mockTimeSlots.timeslots.map(timeslot => ({
                StartTime: timeslot.startTime,
                EndTime: timeslot.endTime,
                Advisors: [{
                    Id: '1',
                    Name: 'test-name',
                }]
            })),
            NextPaging: null
        }));

        const service = createBookingResourceService(mockDelegator)
        const mockConfig = {
            meetingTypeId: '1',
            startTime: new Date(),
            endTime: new Date(),
            skills: [],
            isVirtual: false,
        };

        const data = await service.getTimeSlots(mockConfig);

        expect(data.timeSlots.length).toEqual(mockTimeSlots.timeslots.length);
        expect(mockDelegator).toBeCalledWith({
            method: 'POST',
            fsiCallbackName: GET_TIMESLOTS,
            payload: {
                body: {
                    MeetingType: mockConfig.meetingTypeId,
                    StartDateTime: mockConfig.startTime,
                    EndDateTime: mockConfig.endTime,
                    IsOnlineMeeting: mockConfig.isVirtual,
                }
            },
            version: DEFAULT_REQUEST_PAYLOAD.version,
        })
    });

    it('getTimeSlots with skills', async () => {
        const mockDelegator = vi.fn(() => ({
            TimeSlots: mockTimeSlots.timeslots.map(timeslot => ({
                StartTime: timeslot.startTime,
                EndTime: timeslot.endTime,
                Advisors: [{
                    Id: '1',
                    Name: 'test-name',
                }]
            })),
            NextPaging: null
        }));

        const service = createBookingResourceService(mockDelegator)
        const mockConfig = {
            meetingTypeId: '1',
            startTime: new Date(),
            endTime: new Date(),
            skills: ['skill1', 'skill2'],
            isVirtual: false,
        };

        const data = await service.getTimeSlots(mockConfig);

        expect(data.timeSlots.length).toEqual(mockTimeSlots.timeslots.length);
        expect(mockDelegator).toBeCalledWith({
            method: 'POST',
            fsiCallbackName: GET_TIMESLOTS,
            payload: {
                body: {
                    MeetingType: mockConfig.meetingTypeId,
                    StartDateTime: mockConfig.startTime,
                    EndDateTime: mockConfig.endTime,
                    IsOnlineMeeting: mockConfig.isVirtual,
                    SkillFilter: mockConfig.skills
                }
            },
            version: DEFAULT_REQUEST_PAYLOAD.version,
        })
    });

    it('getTimeSlots with meetingLocationId', async () => {
        const mockDelegator = vi.fn(() => ({
            TimeSlots: mockTimeSlots.timeslots.map(timeslot => ({
                StartTime: timeslot.startTime,
                EndTime: timeslot.endTime,
                Advisors: [{
                    Id: '1',
                    Name: 'test-name',
                }]
            })),
            NextPaging: null
        }));

        const service = createBookingResourceService(mockDelegator)
        const mockConfig = {
            meetingTypeId: '1',
            startTime: new Date(),
            endTime: new Date(),
            skills: [],
            isVirtual: false,
            meetingLocationId: 'organizationId',
        };

        const data = await service.getTimeSlots(mockConfig);

        expect(data.timeSlots.length).toEqual(mockTimeSlots.timeslots.length);
        expect(mockDelegator).toBeCalledWith({
            method: 'POST',
            fsiCallbackName: GET_TIMESLOTS,
            payload: {
                body: {
                    MeetingType: mockConfig.meetingTypeId,
                    StartDateTime: mockConfig.startTime,
                    EndDateTime: mockConfig.endTime,
                    IsOnlineMeeting: mockConfig.isVirtual,
                    RequestedMeetingLocation: mockConfig.meetingLocationId
                }
            },
            version: DEFAULT_REQUEST_PAYLOAD.version,
        })
    });
 })