import React, { FC, useContext } from 'react';
import { DialogManagerContext } from '../contexts/DialogManager/DialogManager';
import { useInterpret } from '@xstate/react';
import { BranchPickerCore } from '../containers/BranchPicker/BranchPicker';
import { IParentServiceMachineService } from '../models/IParentMachineService';
import { BranchPickerService, BRANCH_MEETING_TYPES } from '../machines/branchPicker.machine';
import { MEETING_LIMITATIONS } from '../machines/mainWizard.machine';
import { useBranch, useMeetingTopic, useMeetingType, useVirtualBranch } from '../hooks/useBookingData';
import { useBranchPickerMachine } from '../hooks/useMachine';

export const BranchPickerModal: FC<{ parentService: IParentServiceMachineService }> = ({ parentService }) => {
    const { dialogManager } = useContext(DialogManagerContext);
    const branchPickerMachine = useBranchPickerMachine();
    const initialMeetingTopic = useMeetingTopic(parentService);
    const initialMeetingType = useMeetingType(parentService);
    const initialBranch = useBranch(parentService);
    const isVirtual = useVirtualBranch(parentService);

    const hasPhysicalBranch = !!initialBranch || [MEETING_LIMITATIONS.IN_PERSON, MEETING_LIMITATIONS.ONLINE_AND_PERSON].includes(initialMeetingType.channelLimitation as any)

    const service = useInterpret(branchPickerMachine, {
        context: {
            meetingTopic: initialMeetingTopic,
            meetingType: initialMeetingType,
            selectedBranch: initialBranch,
            branchType:
                hasPhysicalBranch && !isVirtual ? BRANCH_MEETING_TYPES.IN_PERSON : BRANCH_MEETING_TYPES.ONLINE,
        },
        actions: {
            onUpdateBranchData: context =>
                dialogManager?.send({
                    type: 'UPDATE_DATA',
                    data: {
                        selectedBranch: context.branchType === BRANCH_MEETING_TYPES.ONLINE ? undefined: context.selectedBranch,
                        isVirtual: context.branchType === BRANCH_MEETING_TYPES.ONLINE,
                    },
                }),
        },
    });

    return <BranchPickerCore service={service as unknown as BranchPickerService} hideHeader />;
};
