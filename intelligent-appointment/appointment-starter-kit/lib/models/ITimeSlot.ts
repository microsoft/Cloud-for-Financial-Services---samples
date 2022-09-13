// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { IAdvisor } from "./IAdvisor";

export interface ITimeSlotResourceAssignment {
    requirementId: string;
    resourceId: string;
}

export interface ITimeSlot {
    startTime: Date;
    endTime: Date;
    advisors: IAdvisor[];
}

export type TimeSlotSearchRequestPayload = {
    MeetingType: string;
    StartDateTime: Date;
    EndDateTime: Date;
    RequestedMeetingLocation?: string;
    IsOnlineMeeting: boolean;
    SkillFilter?: Array<string>;
    Paging?: string;
}

export interface ITimeSlotSearchConfiguration {
    meetingTypeId: string;
    startTime: Date;
    endTime: Date;
    isVirtual: boolean;
    skills: string[];
    nextPage?: string;
    meetingLocationId?: string;
}

export type ITimeSlotResponse = {
    StartTime: string;
    EndTime: string;
    Advisors: Array<{
        Id: string;
        Name: string;
    }>;
}

export interface ITimeSlotsRawResponse {
    TimeSlots: Array<ITimeSlotResponse>;
    NextPaging?: string;
}

export interface ITimeSlots {
    timeSlots: ITimeSlot[];
    nextPage?: string;
}
