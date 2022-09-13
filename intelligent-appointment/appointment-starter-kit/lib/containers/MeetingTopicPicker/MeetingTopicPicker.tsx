// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { useActor, useInterpret } from '@xstate/react';
import React, { FC, useContext } from 'react';
import { TopicCardChoiceGroup } from '../../components/molecules/TopicCardChoiceGroup';
import { WizardCore } from '../../components/atoms/Wizard/Wizard';
import {
    MeetingTopicPickerIntepreter,
    MeetingTopicPickerEvent,
    MeetingTopicPickerContext,
} from '../../machines/meetingTopicPicker.machine';
import { useTranslation } from '../../hooks/useTranslation';
import { ContextualWrapper } from '../../components/atoms/ContextualWrapper/ContextualWrapper';
import { containerStyles } from '../../styles/Stack.style';
import { IParentServiceMachineService } from '../../models/IParentMachineService';
import { IChooseMeetingCategoryStep, IMeetingTopicPickerCore } from './MeetingTopicPicker.interface';
import { useMeetingTopic, useMeetingType } from '../../hooks/useBookingData';
import { useTopicPickerMachine } from '../../hooks/useMachine';

export const MEETING_TOPIC_PICKER_STEPS_CONFIG = {
    CHOOSE_TOPIC: {
        title: 'MEETING_TOPIC_PICKER.CHOOSE_TOPIC.TITLE',
        eventType: 'UPDATE_TOPIC',
        queryParam: 'topic',
    },
    CHOOSE_MEETING_TYPE: {
        title: 'MEETING_TOPIC_PICKER.CHOOSE_MEETING_TYPE.TITLE',
        eventType: 'UPDATE_MEETING_TYPE',
        queryParam: 'meetingType',
    },
} as const;

const ChooseMeetingCategoryStep: FC<IChooseMeetingCategoryStep> = ({ service, step, moveNextAutomatically, hideStepHeader }) => {
    const [state, send] = useActor(service);
    const t = useTranslation();
    const isChoosingTopic = step.queryParam === MEETING_TOPIC_PICKER_STEPS_CONFIG.CHOOSE_TOPIC.queryParam;

    return (
        <ContextualWrapper service={service}>
            <TopicCardChoiceGroup
                header={hideStepHeader ? '' : t(step.title)}
                selectedTopic={state.context[isChoosingTopic ? 'meetingTopic' : 'meetingType']}
                topics={state.context[isChoosingTopic ? 'topics' : 'types']}
                onSelect={(_, selected) => {
                    send({ type: step.eventType, data: selected?.key } as MeetingTopicPickerEvent);
                    if (moveNextAutomatically) {
                        send('NEXT');
                    }
                }}
            />
        </ContextualWrapper>
    );
};

export const MeetingTopicPickerCore: FC<IMeetingTopicPickerCore> = ({ containerStyles = {}, hideFooter = false, hideHeader = false, service }) => {
    return (
        <WizardCore styles={containerStyles} service={service as any} hideFooter={hideFooter}>
            <ChooseMeetingCategoryStep
                service={service}
                step={MEETING_TOPIC_PICKER_STEPS_CONFIG.CHOOSE_TOPIC}
                hideStepHeader={hideHeader}
                moveNextAutomatically={hideFooter}
            />
            <ChooseMeetingCategoryStep 
                service={service} 
                step={MEETING_TOPIC_PICKER_STEPS_CONFIG.CHOOSE_MEETING_TYPE} 
                hideStepHeader={hideHeader} 
            />
        </WizardCore>
    );
};

export const MeetingTopicPicker: FC<{ parentService: IParentServiceMachineService; }> = ({ parentService }) => {
    const initialMeetingTopic = useMeetingTopic(parentService);
    const initialMeetingType = useMeetingType(parentService);
    const topicPickerMachine = useTopicPickerMachine();

    const service = useInterpret(topicPickerMachine, {
        context: {
            meetingTopic: initialMeetingTopic.id,
            meetingType: initialMeetingType.id,
        },
        actions: {
            onDone: (context: MeetingTopicPickerContext) => {
                parentService.send({
                    type: 'NEXT',
                    data: {
                        meetingTopic: context.topics.find(topic => topic.id === context.meetingTopic),
                        meetingType: context.types.find(type => type.id === context.meetingType),
                    },
                });
            },
        },
    });

    return <MeetingTopicPickerCore service={service as unknown as MeetingTopicPickerIntepreter} containerStyles={containerStyles} />;
};

export default MeetingTopicPicker;
