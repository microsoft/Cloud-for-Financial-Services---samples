import { assign, Interpreter, MachineConfig, ActionObject } from 'xstate';
import { IBranch } from '../models/IBranch';
import { IMeetingType } from '../models/IMeetingType';
import { IMeetingTopic } from '../models/IMeetingTopic';
import { setParam } from '../helpers/queryParams.helper';
import { IObjectWithKey } from '@fluentui/utilities/lib/selection/Selection.types';

export const BRANCH_PICKER_EVENTS = {
    SELECT_BRANCH: 'SELECT_BRANCH',
    SEARCH: 'SEARCH',
    CHANGE_BRANCH_TYPE: 'CHANGE_BRANCH_TYPE',
} as const;

export const BRANCH_MEETING_TYPES = {
    ONLINE: 'ONLINE',
    IN_PERSON: 'IN_PERSON',
} as const;

type ValueOf<T> = T[keyof T];
export interface BranchPickerMachineContext {
    isLoading: boolean;
    branches: Array<IObjectWithKey & IBranch>;
    error?: string;
    selectedBranch?: IBranch & IObjectWithKey;
    searchTerm?: string;
    branchType: ValueOf<typeof BRANCH_MEETING_TYPES>;
    meetingTopic: IMeetingTopic;
    meetingType: IMeetingType;
    isVirtual?: boolean;
}

export type BranchPickerMachineEvents =
    | {
          type: 'SEARCH';
          data: string;
      }
    | {
          type: 'CHANGE_BRANCH_TYPE';
          data: ValueOf<typeof BRANCH_MEETING_TYPES>;
      }
    | {
          type: 'SELECT_BRANCH';
          data?: IBranch;
      }
    | {
          type: 'NEXT';
      }
    | {
          type: 'PREV';
      };

export type BranchPickerService = Interpreter<BranchPickerMachineContext, any, BranchPickerMachineEvents>;

export const branchPickerMachineConfig: MachineConfig<BranchPickerMachineContext, any, any, ActionObject<BranchPickerMachineContext, any>> = {
    id: 'branchPickerMachine',
    initial: 'pre',
    context: {
        isLoading: true,
        branches: [],
        selectedBranch: undefined,
        searchTerm: '',
        branchType: BRANCH_MEETING_TYPES.ONLINE,
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
            always: [{
                target: 'idle',
                cond: (context) => context.branchType === BRANCH_MEETING_TYPES.IN_PERSON,
                actions: assign({
                    isLoading: (context, event) => true,
                })
            }, {
                target: 'active',
                cond: (context) => context.branchType === BRANCH_MEETING_TYPES.ONLINE,
                actions: assign({
                    isLoading: (context, event) => false,
                })
            }]
        },
        idle: {
            invoke: {
                id: 'loadBranches',
                src: 'loadBranches',
                onDone: {
                    actions: assign({
                        branches: (_, event) => {
                            return event.data.map((branch: IBranch) => ({ ...branch, key: branch.id }));
                        },
                        isLoading: (_, _event) => false,
                    }),
                    target: 'active',
                },
                onError: {
                    actions: assign({
                        error: (_, event) => event.data,
                        isLoading: (_, _event) => false,
                    }),
                },
            },
        },
        active: {
            on: {
                SEARCH: {
                    target: 'idle',
                    actions: assign({
                        searchTerm: (_, event) => {
                            return event.data;
                        },
                        isLoading: (_, _event) => true,
                        error: (_, _event) => undefined,
                    }),
                },
                SELECT_BRANCH: {
                    actions: [
                        assign({
                            selectedBranch: (_, event) => event.data,
                        }),
                        (_context, event) => setParam('branchId', event.data?.id || ''),
                        'onUpdateBranchData',
                    ],
                },
                CHANGE_BRANCH_TYPE: {
                    actions: [
                        assign({
                            branchType: (_, event) => event.data,
                            selectedBranch: (context, _event) =>
                                context.branchType === BRANCH_MEETING_TYPES.ONLINE ? undefined : context.selectedBranch,
                        }),
                        'onUpdateBranchData',
                    ],
                    target: 'pre',
                },
                NEXT: {
                    target: 'done',
                    actions: [
                        (context, event) => {
                            setParam('branchId', context.branchType === BRANCH_MEETING_TYPES.ONLINE ? 'virtual' : context.selectedBranch!.id);
                        },
                        'onDone'
                    ],
                    cond: 'hasSelectedBranch',
                },
                PREV: {
                    actions: ['changeTopic'],
                },
            },
        },
        done: {
            type: 'final',
        },
    },
};

export const branchPickerMachineOptions = {
    guards: {
        hasSelectedBranch: context => !!context.selectedBranch || context.branchType === BRANCH_MEETING_TYPES.ONLINE,
    },
    actions: {
        changeTopic: () => {},
        onDone: () => {},
        onUpdateBranchData: () => {},
    },
};
