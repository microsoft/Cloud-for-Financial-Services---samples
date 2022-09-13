// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { assign, Interpreter, MachineConfig } from 'xstate';
import { setParam } from '../helpers/queryParams.helper';
import { IMeetingTopic } from '../models/IMeetingTopic';
import { IMeetingType } from '../models/IMeetingType';

export interface MeetingTopicPickerContext {
    meetingTopic: string;
    meetingType: string;
    topics: IMeetingTopic[];
    types: IMeetingType[];
    error?: any;
    isLoading: any;
}

export interface MeetingTopicPickerEvent {
    type: 'NEXT' | 'PREV' | 'UPDATE_TOPIC' | 'UPDATE_MEETING_TYPE';
    data?: any;
}

export interface MeetingTopicPickerIntepreter extends Interpreter<MeetingTopicPickerContext, any, MeetingTopicPickerEvent> {}

export const topicPickerMachineConfig: MachineConfig<MeetingTopicPickerContext, any, any, any> = {
    id: 'meetingTopicPicker',
    context: {
        meetingTopic: '',
        meetingType: '',
        topics: [],
        types: [],
        isLoading: true,
    },
    initial: 'transit',
    description: 'This is the machine to handle topic and subtopic picker mini-wizard',
    states: {
        transit: {
            always: [
                {
                    target: '0',
                    cond: (context: MeetingTopicPickerContext) => !context.meetingTopic,
                },
                {
                    target: '1',
                    cond: (context: MeetingTopicPickerContext) => !!context.meetingTopic,
                },
            ],
        },
        0: {
            entry: ['onStepEntry'],
            invoke: {
                id: 'loadTopics',
                src: 'loadTopics',
                onDone: {
                    actions: assign({
                        topics: (_, event) => event.data,
                        isLoading: event => false,
                    }),
                },
                onError: {
                    actions: assign({
                        error: (_, event) => event.data,
                        isLoading: event => false,
                    }),
                },
            },
            meta: {
                description: 'Choose the main topic',
            },
            on: {
                NEXT: {
                    meta: {
                        description: 'Needs to have meeting topic defined',
                    },
                    cond: 'hasMeetingTopic',
                    target: '1',
                    actions: [
                        assign({
                            isLoading: event => true,
                        }),
                        (context, event) => setParam('topicId', context.meetingTopic),
                    ],
                },
                UPDATE_TOPIC: {
                    meta: {
                        description: 'Select the topic',
                    },
                    actions: [
                        assign({
                            meetingTopic: (_, event) => event.data,
                            meetingType: (context, event) => (event.data === context.meetingTopic ? context.meetingType : ''),
                        }),
                        'onUpdateTopicData',
                    ],
                },
            },
        },
        1: {
            entry: ['onStepEntry'],
            invoke: {
                id: 'loadSubtopics',
                src: 'loadSubtopics',
                onDone: {
                    actions: assign({
                        types: (_, event) => event.data,
                        isLoading: event => false,
                    }),
                },
                onError: {
                    actions: assign({
                        error: (_, event) => event.data,
                        isLoading: event => false,
                    }),
                },
            },
            meta: {
                description: 'Choose the meeting type according to the main topic',
            },
            on: {
                UPDATE_MEETING_TYPE: {
                    meta: {
                        description: 'Select the subtopic',
                    },
                    actions: [
                        assign({
                            meetingType: (_, event) => event.data,
                        }),
                        'onUpdateTopicData',
                    ],
                },
                NEXT: {
                    meta: {
                        description: 'Needs to have meeting type defined',
                    },
                    cond: 'hasMeetingType',
                    target: 'done',
                    actions: [
                        (context, event) => {
                            const chosenType = context.types.find(type => type.id === context.meetingType);

                            if (!chosenType) return;

                            setParam('meetingTypeId', chosenType.meetingTypeTopicId || chosenType.id);
                        },
                        'onDone'
                    ],
                },
                PREV: {
                    meta: {
                        description: 'Back to topics',
                    },
                    target: '0',
                    actions: assign({
                        isLoading: (_, event) => true,
                        error: (_, event) => null,
                    })
                },
            },
        },
        done: {
            type: 'final',
            entry: ['onStepEntry'],
        },
    },
};

export const topicPickerMachineOptions = {
    guards: {
        hasMeetingTopic: context => !!context.meetingTopic,
        hasMeetingType: context => !!context.meetingType,
    },
    actions: {
        onUpdateTopicData: () => {},
        onDone: () => {},
    },
};
