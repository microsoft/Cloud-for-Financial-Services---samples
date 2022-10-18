// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { IMeeting } from '../models/IMeeting';
import { DelegatorFunc } from '../models/IRequestPayLoad';
import { CANCEL_MEETING, CREATE_MEETING, getRequestPayload, MEETINGS } from './constants';
import { getParam } from "../helpers/queryParams.helper";
import { 
    IMeetingActionsService, 
    IMeetingConfig, 
    IMeetingResponse, 
    CreateMeetingPayload,
    CancelMeetingRequestPayload,
} from './interfaces/IMeetingActionsService';

export const mapMeetingFields = (response: IMeetingResponse): IMeeting => {
    return {
        id: response.Id,
        startTime: new Date(response.StartTime),
        endTime: new Date(response.EndTime),
        isVirtual: response.IsOnline,
        meetingTypeId: response.MeetingType.Id,
        branchId: response.Location?.Id,
        agent: response.Advisors.map(advisor => ({
            id: advisor.Id,
            name: advisor.Name,
        }))[0],
        note: response.CustomerAdditionalNotes,
    };
};

export const createMeetingServices = (delegator: DelegatorFunc): IMeetingActionsService => {
    return {
        createMeeting: async (configuration: IMeetingConfig): Promise<IMeeting> => {
            const requestPayload: CreateMeetingPayload = {
                MeetingType: configuration.meetingTypeId,
                StartDateTime: configuration.startTime,
                Contact: getParam('contactId'),
                RequestedAdvisors: configuration.advisors.map(advisor => advisor.id),
                CustomerAdditionalNotes: configuration.note,
                IsOnlineMeeting: configuration.isVirtual || false,
            };

            if (configuration.branchId) {
                requestPayload.RequestedMeetingLocation = configuration.branchId;
            }

            const payload = getRequestPayload({
                method: 'POST',
                fsiCallbackName: CREATE_MEETING,
                payload: {
                    body: requestPayload,
                },
            });
            const response = (await delegator(payload)) as IMeetingResponse;

            if (!response) throw new Error('No response from server');

            return mapMeetingFields(response);
        },
        cancelMeeting: async (meeting: IMeeting): Promise<boolean> => {
            const bodyPayload: CancelMeetingRequestPayload = {
                Meeting: meeting.id,
            };

            const payload = getRequestPayload({
                method: 'POST',
                fsiCallbackName: CANCEL_MEETING,
                payload: {
                    body: bodyPayload
                },
            });
            const response = await delegator(payload);

            return response.IsAppointmentCancelled;
        },
        getBookedMeeting: async (meetingId: string) => {
            const body = {
                MeetingId: meetingId,
            };

            const payload = getRequestPayload({
                method: 'POST',
                fsiCallbackName: MEETINGS,
                payload: {
                    body,
                },
            });
            
            const response = await delegator(payload);

            return mapMeetingFields(response);
        },
    };
};

export default createMeetingServices;
