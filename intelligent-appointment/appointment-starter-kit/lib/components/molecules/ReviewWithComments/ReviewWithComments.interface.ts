// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FormEvent } from 'react';
import { IAdvisor } from '../../../models/IAdvisor';
import { IBranch } from '../../../models/IBranch';
import { IMeetingType } from '../../../models/IMeetingType';
import { ITimeSlot } from '../../../models/ITimeSlot';

export interface IBookingInfos {
    branch?: IBranch;
    timeSlot?: ITimeSlot;
    meetingType: IMeetingType;
    meetingTopicName: string;
    agent?: IAdvisor;
}

export interface IReviewWithCommentsProps extends IBookingInfos {
    isCommentReadonly?: boolean;
    onCommentChange?: (newValue?: string, event?: FormEvent) => void;
    comments?: string;
}
