// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React from 'react';
import { MeetingTopicPicker } from '../MeetingTopicPicker/MeetingTopicPicker';
import { WizardCore } from '../../components/atoms/Wizard/Wizard';
import { useInterpret } from '@xstate/react';
import { TimeSlotPicker } from '../TimeSlotPicker/TimeSlotPicker';
import { BranchPicker } from '../BranchPicker/BranchPicker';
import { ReviewBooking } from '../ReviewBooking/ReviewBooking';
import Confirmation from '../Confirmation/Confirmation';
import { SchedulingWizardService } from '../../machines';
import { DialogManagerProvider } from '../../contexts/DialogManager/DialogManager';
import { useSchedulingMachine } from '../../hooks/useMachine';
import { ContextualWrapper } from '../../components/atoms/ContextualWrapper/ContextualWrapper';

const schedulingStyles = { root: { height: '100%', textAlign: 'start', border: '1px solid #AAAAAA', overflow: 'auto' as any}};

export const SchedulingWizard = () => {
    const schedulingMachine = useSchedulingMachine();
    const schedulingService = useInterpret(schedulingMachine) as unknown as SchedulingWizardService;

    return (
        <DialogManagerProvider>
            <ContextualWrapper service={schedulingService}>
                <WizardCore service={schedulingService} hideFooter styles={schedulingStyles}>
                    <MeetingTopicPicker parentService={schedulingService} />
                    <BranchPicker parentService={schedulingService} />
                    <TimeSlotPicker parentService={schedulingService} />
                    <ReviewBooking parentService={schedulingService} />
                    <Confirmation parentService={schedulingService} />
                </WizardCore>
            </ContextualWrapper>
        </DialogManagerProvider>
    );
};
