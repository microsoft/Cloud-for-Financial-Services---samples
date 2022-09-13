// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { FC, useContext } from 'react';
import { IStackStyles, DialogFooter as FluentDialogFooter, DefaultButton, PrimaryButton, Stack } from '@fluentui/react';
import { MeetingTopicPickerCore, MEETING_TOPIC_PICKER_STEPS_CONFIG } from '../containers/MeetingTopicPicker/MeetingTopicPicker';
import { Interpreter } from 'xstate';
import { DialogManagerContext } from '../contexts/DialogManager/DialogManager';
import { IMeetingTopic } from '../models/IMeetingTopic';
import { IMeetingType } from '../models/IMeetingType';
import { useSelector, useInterpret } from '@xstate/react';
import { useTranslation } from '../hooks/useTranslation';
import { MeetingTopicPickerContext, MeetingTopicPickerIntepreter } from '../machines/meetingTopicPicker.machine';
import { useMeetingTopic, useMeetingType } from '../hooks/useBookingData';
import { useTopicPickerMachine } from '../hooks/useMachine';
import { WIZARD_EVENTS } from '../components/atoms/Wizard/Wizard';

const MeetingTopicModalFooter: FC<{
    service: MeetingTopicPickerIntepreter;
}> = ({ service }) => {
    const { dialogManager } = useContext(DialogManagerContext);
    const t = useTranslation();
    const isFirstStep = useSelector(service, state => state.matches('0'));

    return (
        <FluentDialogFooter
            styles={{
                action: {
                    display: 'flex',
                    width: '100%',
                    margin: 0,
                },
                actions: { margin: 0 },
                actionsRight: { margin: 0 },
            }}
        >
            <Stack horizontal horizontalAlign={isFirstStep ? 'end' : 'space-between'} grow>
                {!isFirstStep && <DefaultButton text={t('MEETING_BRANCH_PICKER.ACTIONS.CHANGE_TOPIC')} onClick={() => service.send('PREV')} />}
                <Stack horizontal tokens={{ childrenGap: 8 }}>
                    <PrimaryButton onClick={() => dialogManager?.send('CONFIRM')} text={t('OK')} data-testid="acceptBtn" />
                    <DefaultButton onClick={() => dialogManager?.send('CANCEL')} text={t('CANCEL')} data-testid="cancelBtn" />
                </Stack>
            </Stack>
        </FluentDialogFooter>
    );
};

const containerStyles: IStackStyles = { root: { overflow: 'auto' } };

export const MeetingTopicPickerModal: FC<{
    parentService: Interpreter<any, any, any>;
}> = ({ parentService }) => {
    const { dialogManager } = useContext(DialogManagerContext);
    const topicPickerMachine = useTopicPickerMachine();
    const t = useTranslation();
    const initialMeetingTopic = useMeetingTopic(parentService);
    const initialMeetingType = useMeetingType(parentService);

    const service = useInterpret(topicPickerMachine, {
        context: {
            meetingTopic: initialMeetingTopic.id,
            meetingType: initialMeetingType.id,
        },
        actions: {
            onUpdateTopicData: (context: MeetingTopicPickerContext) => {
                dialogManager?.send({
                    type: 'UPDATE_DATA',
                    data: {
                        meetingTopic:
                            context.meetingTopic === initialMeetingTopic.id
                                ? initialMeetingTopic
                                : context.topics.find((topic: IMeetingTopic) => topic.id === context.meetingTopic),
                        meetingType: context.types.find((type: IMeetingType) => type.id === context.meetingType),
                    },
                });
            },
            onStepEntry: (_context, _event, actionMeta) => {
                dialogManager?.send({
                    type: 'UPDATE_TITLE',
                    data: actionMeta.state.matches('0')
                        ? t(MEETING_TOPIC_PICKER_STEPS_CONFIG.CHOOSE_TOPIC.title)
                        : t(MEETING_TOPIC_PICKER_STEPS_CONFIG.CHOOSE_MEETING_TYPE.title),
                });
            },
        },
    });

    return (
        <>
            <MeetingTopicPickerCore
                containerStyles={containerStyles}
                service={service as unknown as MeetingTopicPickerIntepreter}
                hideFooter
                hideHeader
            />
            <MeetingTopicModalFooter service={service as unknown as MeetingTopicPickerIntepreter} />
        </>
    );
};
