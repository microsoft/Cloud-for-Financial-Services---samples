// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { IMeetingType } from '../../models/IMeetingType';
import { IMeetingTopic } from '../../models/IMeetingTopic';
import { IBranch } from '../../models/IBranch';
import { MEETING_LIMITATIONS } from '../../machines/mainWizard.machine';

export const MEETING_METHODS = {
    ONLINE: 104800000,
    IN_PERSON: 104800001,
} as const;

export type MeetingMethodKeys = keyof typeof MEETING_METHODS;
export type MeetingMethod = typeof MEETING_METHODS[MeetingMethodKeys];

export type MeetingChannelKeys = keyof typeof MEETING_LIMITATIONS;
export type MeetingChannel = typeof MEETING_LIMITATIONS[MeetingChannelKeys];

export interface IMeetingResourcesService {
    getMeetingTypes(topicId: string): Promise<IMeetingType[]>;
    getMeetingTopics(): Promise<IMeetingTopic[]>;
    getBranches({ meetingTypeId, searchTerm } : { meetingTypeId: string; searchTerm?: string }): Promise<IBranch[]>;
    getBranch(branchId: string): Promise<IBranch | undefined>;
    getSchedulingProperties(): Promise<MeetingResources>;
    getMeetingTopic(topicId: string): Promise<IMeetingTopic | undefined>;
    getMeetingType(meetingTypeId: string): Promise<IMeetingType | undefined>;
}

export type MeetingTypeResponse = {
    Id: string;
    Name: string;
    Description: string;
    Channel?: {
        Label: string;
        Value: MeetingChannel;
    };
    DefaultMethod?: {
        Label: string;
        Value: MeetingMethod;
    };
    Duration: number;
    Locations?: string[];
    Topics?: string[]
    Notes?: string;
};

export type BranchResponse = {
    Id: string;
    Name: string;
    Address1: string;
    Address2?: string;
    City?: string;
    CountryOrRegion?: string;
    PostalCode: string;
    Telephone?: string;
};

export type MeetingTopicResponse = { 
    Id: string;
    Name: string;
    Description: string;
};

export type MeetingResources = {
    topics: Map<string, IMeetingTopic>,
    meetingTypes: Map<string, IMeetingType>,
    branches: Map<string, IBranch>,
    meetingTypesEdges: Map<string, string[]>,
    branchesEdges: Map<string, string[]>,
}

export type SchedulingPropertiesRawResponse = {
    Locations: BranchResponse[];
    MeetingTypes: MeetingTypeResponse[];
    Topics: MeetingTopicResponse[];
}