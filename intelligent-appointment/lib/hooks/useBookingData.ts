import { useSelector } from '@xstate/react';
import { SchedulingWizardContext, SchedulingWizardService } from '../machines/mainWizard.machine';
import { IParentServiceMachineService } from '../models/IParentMachineService';

const selectBookingData = (state: { context: SchedulingWizardContext }) => {
    const { branch, meetingTopic, meetingType, timeSlot, appointment } = state.context;

    return { branch, meetingTopicName: meetingTopic.name, meetingType, timeSlot, agent: appointment?.agent };
};

export const useBookingData = (parentService: IParentServiceMachineService) => useSelector(parentService, selectBookingData);

export const useComments = (service: SchedulingWizardService) => useSelector(service, state => state.context.appointment?.note);

export const useMeetingTopic = (service: IParentServiceMachineService) => useSelector(service, state => state.context.meetingTopic);

export const useMeetingType = (service: IParentServiceMachineService) => useSelector(service, state => state.context.meetingType);

export const useBranch = (service: IParentServiceMachineService) => useSelector(service, state => state.context.branch);

export const useTimeSlot = (service: IParentServiceMachineService) => useSelector(service, state => state.context.timeSlot);

export const useVirtualBranch = (service: IParentServiceMachineService) => useSelector(service, state => state.context.isVirtual);