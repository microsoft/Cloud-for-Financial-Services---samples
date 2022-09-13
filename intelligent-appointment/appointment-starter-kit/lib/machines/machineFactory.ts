import { createMachine, StateMachine } from 'xstate';
import { getParam } from '../helpers/queryParams.helper';
import { IMeetingConfig } from '../services/interfaces/IMeetingActionsService';
import { IBookingResourcesService } from '../services/interfaces/IBookingResourcesService';
import { IMeetingResourcesService } from '../services/interfaces/IMeetingResourcesService';
import { IServices } from '../services/interfaces/IServices';
import { branchPickerMachineConfig, branchPickerMachineOptions, BranchPickerMachineContext } from './branchPicker.machine';
import { schedulingWizardMachineConfig, schedulingWizardMachineOptions, SchedulingWizardContext } from './mainWizard.machine';
import { topicPickerMachineConfig, topicPickerMachineOptions, MeetingTopicPickerContext } from './meetingTopicPicker.machine';
import { TimeSlotPickerContext, timeSlotPickerMachineConfig, timeSlotPickerMachineOptions } from './timeSlotPicker.machine';

export interface IAClientMachines {
    schedulingMachine: StateMachine<SchedulingWizardContext, any, any, any>;
    topicPickerMachine: StateMachine<MeetingTopicPickerContext, any, any, any>;
    branchPickerMachine: StateMachine<BranchPickerMachineContext, any, any, any>;
    timeSlotPickerMachine: StateMachine<TimeSlotPickerContext, any, any, any>;
}

const createMeetingFunc = ({ meetingActions } : IServices) => async (context, event) => {
    const { meetingTopic, meetingType, timeSlot, branch, isVirtual } = context;

    if (!timeSlot || !meetingTopic || !meetingType) {
        return;
    }

    const configurations: IMeetingConfig = {
        meetingTypeId: meetingType.id,
        branchId: branch?.id,
        id: '',
        note: event.data,
        isVirtual,
        ...timeSlot,
    };

    const meeting = await meetingActions.createMeeting(configurations);

    return {
        ...context.appointment,
        note: event.data,
        ...meeting,
    }
};

const loadTimeSlotsFunc = (bookingResources: IBookingResourcesService) => async (context: TimeSlotPickerContext, event) => {
    const canLoadTimeSlots = context.meetingType.id && (context.isVirtual || context.branch);

    if (!canLoadTimeSlots) {
        return Promise.resolve({
            timeSlots: [],
        });
    }

    const data = await bookingResources.getTimeSlots({
        meetingTypeId: context.meetingType.id,
        isVirtual: context.isVirtual || false,
        startTime: context.selectedRange.startDate,
        endTime: context.selectedRange.endDate,
        nextPage: context.nextPage,
        skills: [],
        meetingLocationId: context.branch?.id,
    });

    return data
};

const loadMeetingData = (meetingResources: IMeetingResourcesService) => async context => {
    const topicId = getParam('topicId');
    const meetingTypeId = getParam('meetingTypeId');
    const branchTopicId = getParam('branchId');
    const newContext = { ...context };

    if (topicId) {
        const topic = await meetingResources.getMeetingTopic(topicId);
        newContext.meetingTopic = topic;
    }


    if (meetingTypeId) {
        const meetingType = await meetingResources.getMeetingType(meetingTypeId);
        newContext.meetingType = meetingType;
    }

    if (branchTopicId) {
        if (branchTopicId === 'virtual') {
            newContext.isVirtual = true;
        } else {
            const branchTopic = await meetingResources.getBranch(branchTopicId);

            if (branchTopic) {
                newContext.branch = branchTopic;
            }
        }
    }

    return Promise.resolve(newContext);
};

export const createStateMachines = (services: IServices): IAClientMachines => {
    return {
        branchPickerMachine: createMachine(branchPickerMachineConfig, {
            ...branchPickerMachineOptions,
            services: {
                loadBranches: async (context, _event) => {
                    const searchTerm = context.searchTerm?.trim().toLowerCase() || '';

                    return services.meetingResources.getBranches({ 
                        meetingTypeId: context.meetingType.id, 
                        searchTerm
                    });
                }
            },
        }),
        schedulingMachine: createMachine(schedulingWizardMachineConfig, {
            ...(schedulingWizardMachineOptions as any),
            services: {
                loadMeetingData: loadMeetingData(services.meetingResources),
                createMeeting: createMeetingFunc(services),
            },
        }),
        topicPickerMachine: createMachine(topicPickerMachineConfig, {
            ...topicPickerMachineOptions,
            services: {
                loadTopics: context => {
                    return services.meetingResources.getMeetingTopics();
                },
                loadSubtopics: context => {
                    return services.meetingResources.getMeetingTypes(context.meetingTopic);
                },
            },
        }),
        timeSlotPickerMachine: createMachine(timeSlotPickerMachineConfig, {
            ...(timeSlotPickerMachineOptions as any),
            services: {
                loadTimeSlots: loadTimeSlotsFunc(services.bookingResources),
                resetSelectedBranch: async (context: TimeSlotPickerContext) => {
                    if (context.isVirtual) return undefined;

                    const branches = await services.meetingResources.getBranches({ meetingTypeId: context.meetingType.id });

                    if (!branches?.length || !branches.find(b => b.id === context.branch!.id)) return undefined;

                    return context.branch;
                }
            }
        }),
    };
};
