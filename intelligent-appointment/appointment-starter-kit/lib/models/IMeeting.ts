// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { IAdvisor } from './IAdvisor';
import { IMeetingTimeRange } from './IMeetingTimeRange';

export interface IMeeting extends IMeetingTimeRange {
    id: string;
    meetingTypeId: string;
    branchId: string;
    agent?: IAdvisor;
    note?: string;
    isVirtual?: boolean;
    virtualMeetingLink?: string;
}
