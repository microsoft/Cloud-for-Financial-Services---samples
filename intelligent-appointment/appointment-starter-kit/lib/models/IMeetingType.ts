// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { IMeetingTopic } from './IMeetingTopic';

export interface IMeetingType extends IMeetingTopic {
    duration?: number;
    channelLimitation?: number;
    meetingTypeTopicId?: string;
    customerInstructions?: string;
}
