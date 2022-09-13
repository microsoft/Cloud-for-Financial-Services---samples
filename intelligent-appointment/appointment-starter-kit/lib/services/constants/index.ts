// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export const DEFAULT_REQUEST_PAYLOAD = {
    version: '1.0',
}

export const GET_TIMESLOTS = 'msfsi_GetAvailableMeetingTimeSlots';

export const CREATE_MEETING = 'msfsi_CreateMeeting';

export const CANCEL_MEETING = 'msfsi_CancelMeeting';

export const GET_SCHEDULE_PROPERTIES = 'msfsi_GetSchedulingProperties';

export const MEETINGS = 'msfsi_GetMeeting';

export const getRequestPayload = payload => ({
    ...DEFAULT_REQUEST_PAYLOAD,
    ...payload,
});