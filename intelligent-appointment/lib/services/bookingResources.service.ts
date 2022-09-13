import { DelegatorFunc } from '../models/IRequestPayLoad';
import { ITimeSlot, ITimeSlots, ITimeSlotSearchConfiguration, TimeSlotSearchRequestPayload, ITimeSlotsRawResponse } from '../models/ITimeSlot';
import { getRequestPayload, GET_TIMESLOTS } from './constants';
import { IBookingResourcesService } from './interfaces/IBookingResourcesService';

const mapToTimeSlots = (rawTimeSlots: ITimeSlotsRawResponse): ITimeSlots => {
    const timeSlots = rawTimeSlots.TimeSlots;

    return {
        timeSlots: timeSlots.map(timeSlot => ({
            startTime: new Date(timeSlot.StartTime),
            endTime: new Date(timeSlot.EndTime),
            advisors: timeSlot.Advisors.map(advisor => ({
                id: advisor.Id,
                name: advisor.Name,
            })),
        })),
        nextPage: rawTimeSlots.NextPaging,
    };
};

export const createBookingResourceService = (delegator: DelegatorFunc): IBookingResourcesService => {
    return {
        getTimeSlots: async (configurations: ITimeSlotSearchConfiguration): Promise<{ timeSlots: ITimeSlot[]; nextPage?: string }> => {
            const requestPayload: TimeSlotSearchRequestPayload = {
                MeetingType: configurations.meetingTypeId,
                StartDateTime: configurations.startTime,
                EndDateTime: configurations.endTime,
                IsOnlineMeeting: configurations.isVirtual,
                RequestedMeetingLocation: configurations.meetingLocationId,
                Paging: configurations.nextPage,
            };

            if (configurations.meetingLocationId && !configurations.isVirtual) {
                requestPayload.RequestedMeetingLocation = configurations.meetingLocationId
            }

            if (configurations.skills.length > 0) {
                requestPayload.SkillFilter = configurations.skills;
            }

            const payload = getRequestPayload({
                method: 'POST',
                fsiCallbackName: GET_TIMESLOTS,
                payload: {
                    body: requestPayload,
                },
            });
            const response = (await delegator(payload)) as ITimeSlotsRawResponse;

            if (!response.TimeSlots) { throw new Error('No timeslots found'); }

            return mapToTimeSlots(response);
        }
    };
};
