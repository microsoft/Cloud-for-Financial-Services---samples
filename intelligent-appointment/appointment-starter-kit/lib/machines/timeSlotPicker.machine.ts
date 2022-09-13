// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { assign, createMachine, Interpreter, MachineConfig, spawn } from 'xstate';
import { ITimeSlot } from '../models/ITimeSlot';
import format from 'date-fns/format';
import { MEETING_LIMITATIONS } from './mainWizard.machine';
import { IObjectWithKey } from '@fluentui/react';
import { IParentServiceMachineContext } from '../models/IParentMachineService';
import { dateRanges } from '../helpers/date.helper';
import { DateRangeSelection } from '../models/IDateRangeOption';
import { IBranch } from '../models/IBranch';
import { IMeetingTopic } from '../models/IMeetingTopic';
import { IMeetingType } from '../models/IMeetingType';
import isSameMinute from 'date-fns/isSameMinute';

export const TIMESLOT_PICKERS_EVENTS = {
    SELECT_TIMESLOT: 'SELECT_TIMESLOT',
    CHANGE_TOPIC: 'CHANGE_TOPIC',
    CHANGE_BRANCH: 'CHANGE_BRANCH',
    LOAD_MORE: 'LOAD_MORE',
    CHANGE_DATE_RANGE: 'CHANGE_DATE_RANGE',
} as const;

export type TimeSlotPickerEvents =
    | {
          type: 'CHANGE_TOPIC';
          data: {
              meetingType: IMeetingType;
              meetingTopic: IMeetingTopic;
          };
      }
    | {
          type: 'CHANGE_BRANCH';
          data: {
              selectedBranch: IBranch;
              isVirtual?: boolean;
          };
      }
    | {
          type: 'LOAD_MORE';
      }
    | {
          type: 'SELECT_TIMESLOT';
          data: ITimeSlot;
      }
    | {
          type: 'CHANGE_DATE_RANGE';
          data: DateRangeSelection;
      }
    | {
          type: 'NEXT';
      };

export interface TimeSlotPickerContext extends IParentServiceMachineContext {
    isLoading: boolean;
    nextPage?: string;
    error?: string;
    groupedTimeSlots: Array<any>;
    timeSlots: Array<IObjectWithKey & ITimeSlot>;
    selectedTimeSlot?: ITimeSlot;
    selectedRange: DateRangeSelection;
}

export type TimeslotPickerService = Interpreter<TimeSlotPickerContext, any, TimeSlotPickerEvents>;

export const timeSlotPickerMachineConfig: MachineConfig<TimeSlotPickerContext, any, any, any> = {
    id: 'timeSlotPicker',
    initial: 'idle',
    context: {
        isLoading: true,
        meetingTopic: {
            id: '',
            name: '',
        },
        meetingType: {
            id: '',
            name: '',
        },
        isVirtual: true,
        timeSlots: [],
        groupedTimeSlots: [],
        selectedTimeSlot: undefined,
        selectedRange: dateRanges.thisWeek.calculateRange(),
    },
    states: {
        reset: {
            invoke: {
                id: 'resetBranch',
                src: 'resetSelectedBranch',
                onDone: {
                    actions: assign({
                        branch: (context, event) => event.data,
                    }),
                    target: 'idle',
                },
                onError: 'idle'
            }
        },
        idle: {
            invoke: {
                id: 'loadTimeSlots',
                src: 'loadTimeSlots',
                onDone: {
                    actions: assign({
                        timeSlots: (context, event) => {
                            const timeSlots = event.data.timeSlots
                                .map((timeSlot: ITimeSlot, index: number) => ({ ...timeSlot, key: context.timeSlots.length + index }))
                                .filter(timeSlot => !context.timeSlots.find(ts => isSameMinute(ts.startTime, timeSlot.startTime)));
                            return [...context.timeSlots, ...timeSlots];
                        },
                        isLoading: event => false,
                        groupedTimeSlots: (context, event) => {
                            const group = new Map(context.groupedTimeSlots.map(g => [g.key, g]));
                            (event.data?.timeSlots || []).forEach((slot: ITimeSlot, index: number) => {
                                const startDay = format(slot.startTime, 'MMMM dd, yyyy');

                                if (!group.has(startDay)) {
                                    group.set(startDay, {
                                        key: startDay,
                                        name: startDay,
                                        startIndex: context.timeSlots.length + index,
                                        count: 0,
                                        startTime: slot.startTime,
                                    });
                                }

                                group.get(startDay).count++;
                            });

                            return Array.from(group.values());
                        },
                        nextPage: (_, event) => {
                            return event.data?.nextPage;
                        },
                    }),
                    target: 'active',
                },
                onError: {
                    actions: assign({
                        error: (_, event) => event.data,
                        isLoading: event => false,
                    }),
                    target: 'active',
                },
            },
        },
        active: {
            id: 'active',
            on: {
                [TIMESLOT_PICKERS_EVENTS.CHANGE_TOPIC]: {
                    actions: [
                        'setLoadingTrue',
                        'resetError',
                        'resetTimeSlotData',
                        assign({
                            meetingTopic: (_, event) => event.data.meetingTopic,
                            meetingType: (_, event) => event.data.meetingType,
                            isVirtual: (_, event) =>
                                MEETING_LIMITATIONS.ONLINE === event.data.meetingType.channelLimitation,
                        }),
                    ],
                    target: 'reset',
                },
                [TIMESLOT_PICKERS_EVENTS.CHANGE_BRANCH]: {
                    actions: [
                        'setLoadingTrue',
                        'resetError',
                        'resetTimeSlotData',
                        assign({
                            branch: (_, event) => event.data.selectedBranch,
                            isVirtual: (_, event) => event.data.isVirtual,
                        }),
                    ],
                    target: 'idle',
                },
                [TIMESLOT_PICKERS_EVENTS.LOAD_MORE]: {
                    actions: ['setLoadingTrue'],
                    target: 'idle',
                    //Only the next section of pages is loaded
                },
                [TIMESLOT_PICKERS_EVENTS.SELECT_TIMESLOT]: {
                    actions: [
                        assign({
                            selectedTimeSlot: (_, event) => event.data,
                        }),
                    ],
                },
                [TIMESLOT_PICKERS_EVENTS.CHANGE_DATE_RANGE]: {
                    actions: [
                        'setLoadingTrue',
                        'resetTimeSlotData',
                        assign({
                            selectedRange: (_, event) => event.data,
                        }),
                    ],
                    target: 'idle',
                },
                NEXT: {
                    target: 'done',
                    cond: 'hasSelectedTimeSlot',
                    actions: ['onDone'],
                },
            },
        },
        done: {
            type: 'final',
            meta: {
                description: 'Complete the selection of time slot',
            },
        },
    },
};

export const timeSlotPickerMachineOptions = {
    actions: {
        setLoadingTrue: assign({
            isLoading: (_, event) => true,
        }),
        resetError: assign({
            error: (_, event) => undefined,
        }),
        resetTimeSlotData: assign({
            timeSlots: (_, event) => [],
            groupedTimeSlots: (_, event) => [],
            selectedTimeSlot: (_, event) => undefined,
            nextPage: (_, event) => undefined,
        }),        
    },
    guards: {
        hasSelectedTimeSlot: (context, event) => {
            return !!context.selectedTimeSlot;
        },
    },
};
