// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { useContext } from 'react';
import { FSIAppointmentClientContext } from '../contexts/FSIAppointmentClientProvider/FSIAppointmentClientProvider';
import { IAClientMachines } from '../machines';

export const useMachines = ():IAClientMachines => {
    return useContext(FSIAppointmentClientContext);
}

export const useBranchPickerMachine = () => useMachines().branchPickerMachine;
export const useTopicPickerMachine = () => useMachines().topicPickerMachine;
export const useTimeSlotPickerMachine = () => useMachines().timeSlotPickerMachine;
export const useSchedulingMachine = () => useMachines().schedulingMachine;
