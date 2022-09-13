// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { BranchResponse } from '../..';
import { IMeeting } from '../../models/IMeeting';
import { ITimeSlot } from '../../models/ITimeSlot';

export const MEETING_STATES = {
    OPEN: 0,
    COMPLETED: 1,
    CANCELED: 2,
    SCHEDULED: 3
} as const;

export type MeetingStateKeys = keyof typeof MEETING_STATES;
export type MeetingState = typeof MEETING_STATES[MeetingStateKeys];

export interface IMeetingConfig extends IMeeting, ITimeSlot {}

export type CreateMeetingResponse = {
    Meeting: IMeetingResponse;
}

export type CreateMeetingPayload = {
    MeetingType: string;
    StartDateTime: Date;
    Contact: string;
    RequestedAdvisors: string[];
    RequestedMeetingLocation?: string;
    IsOnlineMeeting: boolean;
    CustomerAdditionalNotes?: string;
}

export interface IMeetingResponse {
    Id: string;
    StartTime: Date;
    EndTime: Date;
    Duration: number;
    IsOnline: boolean;
    CustomerAdditionalNotes: string;
    State: MeetingState;
    MeetingJoinUrl: string;
    Location: BranchResponse;
    MeetingType: {
        Id: string;
        Name: string;
        Description: string;
        Notes: string;
    };
    Advisors: Array<{
        Id: string;
        Name: string;
    }>
}

export type CancelMeetingRequestPayload = {
    Meeting: string;
}

export interface IMeetingActionsService {
    createMeeting: (meetingConfigs: IMeetingConfig) => Promise<IMeeting>;
    cancelMeeting: (meeting: IMeeting) => Promise<boolean>;
    getBookedMeeting: (meetingId: string) => Promise<IMeeting>;
}