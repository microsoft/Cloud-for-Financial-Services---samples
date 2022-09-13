// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MeetingTopicPickerIntepreter } from '../../machines/meetingTopicPicker.machine';
import { IStackStyles } from '@fluentui/react';

export interface IChooseMeetingCategoryStep {
    service: MeetingTopicPickerIntepreter;
    step: {
        title: string;
        eventType: string;
        queryParam: string;
    };
    moveNextAutomatically?: boolean;
    hideStepHeader?: boolean;
}

export interface IMeetingTopicPickerCore {
    service: MeetingTopicPickerIntepreter;
    containerStyles?: IStackStyles;
    hideFooter?: boolean;
    hideHeader?: boolean;
}
