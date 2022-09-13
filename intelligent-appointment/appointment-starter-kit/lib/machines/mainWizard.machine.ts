// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Interpreter, assign, MachineConfig, ActionObject } from 'xstate';
import { IMeeting } from '../models/IMeeting';
import { IParentServiceMachineContext } from '../models/IParentMachineService';

export interface SchedulingWizardContext extends IParentServiceMachineContext {
    appointment?: IMeeting;
    isLoading?: boolean;
    error?: string;
    bookingError?: string;
    loadingTitle?: string;
}
export interface SchedulingWizardEvents {
    type: 'NEXT' | 'PREV' | 'SUBMIT_SUCCESS' | 'SUBMIT_ERROR' | 'RETRY';
    data?: any;
}

export const MEETING_LIMITATIONS = {
    ONLINE: 104800000,
    IN_PERSON: 104800001,
    ONLINE_AND_PERSON: 104800002,
} as const;

export type SchedulingWizardService = Interpreter<SchedulingWizardContext, any, SchedulingWizardEvents>;

export const schedulingWizardMachineConfig: MachineConfig<SchedulingWizardContext, any, any, ActionObject<SchedulingWizardContext, any>> = {
    id: 'scheduling',
    initial: 'pre',
    context: {
        isLoading: true,
        meetingType: {
            id: '',
            name: '',
        },
        meetingTopic: {
            id: '',
            name: '',
        },
    },
    states: {
        pre: {
            invoke: {
                id: 'loadMeetingData',
                src: 'loadMeetingData',
                onDone: {
                    actions: [
                        'resetLoading',
                        assign({
                            meetingTopic: (context, event) => event.data.meetingTopic || context.meetingTopic,
                            meetingType: (context, event) => event.data.meetingType || context.meetingType,
                            branch: (context, event) => event.data.branch || context.branch,
                        })
                    ],
                    target: 'transit',
                },
                onError: {
                    actions: [
                        'setError',
                        'resetLoading'
                    ],
                },
            },
        },
        0: {
            id: 'topic',
            meta: {
                description: 'Choose meeting topic and meeting type filter',
            },
            on: {
                NEXT: {
                    target: 'transit',
                    actions: assign({
                        meetingTopic: (context, event) => event.data.meetingTopic || context.meetingTopic,
                        meetingType: (context, event) => event.data.meetingType || context.meetingType,
                    }),
                },
            },
        },
        transit: {
            always: [
                {
                    target: '#topic',
                    cond: (context: SchedulingWizardContext) => !context.meetingType.id,
                },
                {
                    target: '#timeslots',
                    cond: (context: SchedulingWizardContext) => {
                        const { channelLimitation = MEETING_LIMITATIONS.ONLINE } = context.meetingType;
                        return MEETING_LIMITATIONS.ONLINE === channelLimitation || !!context.branch;
                    },
                    actions: assign({
                        isVirtual: (context, event) => !context.branch,
                    }),
                },
                {
                    target: '#branches',
                    cond: (context: SchedulingWizardContext) => {
                        const { channelLimitation = MEETING_LIMITATIONS.ONLINE } = context.meetingType;
                        return [MEETING_LIMITATIONS.IN_PERSON, MEETING_LIMITATIONS.ONLINE_AND_PERSON].includes(channelLimitation as any);
                    },
                },
            ],
        },
        1: {
            id: 'branches',
            meta: {
                description: 'Choose branch',
            },
            on: {
                PREV: {
                    target: '0',
                    meta: {
                        description: 'Go back to topic selection',
                    },
                },
                NEXT: {
                    target: '#timeslots',
                    actions: assign({
                        branch: (_, event) => (!event.data.isVirtual ? event.data.branch : undefined),
                        isVirtual: (_, event) => event.data.isVirtual,
                    }),
                    meta: {
                        description: 'Go to timeslots selection',
                    },
                },
            },
        },
        2: {
            id: 'timeslots',
            meta: {
                description: 'Choose timeslot and modify the filters',
            },
            on: {
                NEXT: {
                    target: '#review',
                    actions: assign({
                        timeSlot: (_, event) => event.data.timeSlot,
                        meetingTopic: (context, event) => event.data.meetingTopic || context.meetingTopic,
                        meetingType: (context, event) => event.data.meetingType || context.meetingType,
                        branch: (_, event) => event.data.branch,
                        isVirtual: (_, event) => event.data.isVirtual,
                    }),
                    meta: {
                        description: 'Go to review and confirm',
                    },
                },
            },
        },
        3: {
            id: 'review',
            meta: {
                description: 'Review the appointment',
            },
            on: {
                PREV: {
                    target: '#timeslots',
                    actions: [
                        'resetError'
                    ]
                },
                NEXT: {
                    target: '#booking',
                    actions: [
                        'setLoadingTrue',
                        'resetError',
                        'setLoadingTitle',
                    ],
                },
            },
        },
        booking: {
            id: 'booking',
            meta: {
                description: 'Booking appointment',
            },
            invoke: {
                id: 'bookMeeting',
                src: 'createMeeting',
                onDone: {
                    target: '#done',
                    actions: [
                        assign({
                            appointment: (context, event) => {
                                return event.data;
                            },
                        }),
                        'resetLoading',
                        'resetError',                        
                    ],
                },
                onError: {
                    target: '#review',
                    actions: [
                        'setBookingError',
                        'resetLoading',                        
                    ]
                },
            },
        },
        4: {
            id: 'done',
            type: 'final',
            meta: {
                description: 'Confirmation',
            },
        },
    },
};

export const schedulingWizardMachineOptions = {
    services: {
        loadMeetingData: context => context,
        createMeeting: async (context, event) => Promise.reject('No api implemented'),
    },
    actions: {
        setLoadingTrue: assign({
            isLoading: (_, event) => true,
        }),
        resetError: assign({
            error: (_, event) => undefined,
            bookingError: (_, event) => undefined,
        }),
        resetLoading: assign({
            isLoading: (_, event) => false,
            loadingTitle: (_, event) => undefined,
        }),
        setBookingError: assign({
            bookingError: (_, event) => "SCHEDULE_MEETING.NOTIFICATIONS.ERROR.TITLE",
        }),
        setLoadingTitle: assign({
            loadingTitle: (_, event) => "SCHEDULE_MEETING.LOADING",
        }),
    },
};
