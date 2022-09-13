import { IMeetingTopic } from './IMeetingTopic';

export interface IMeetingType extends IMeetingTopic {
    duration?: number;
    channelLimitation?: number;
    meetingTypeTopicId?: string;
    customerInstructions?: string;
}
