// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { FC, useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { pickerFooterGap, pickerFooterStyles } from '../BranchPicker/BranchPicker.style';
import { Stack, DefaultButton, PrimaryButton } from '@fluentui/react';
import { WIZARD_EVENTS } from '../../components/atoms/Wizard/Wizard';
import ReviewWithComments from '../../components/molecules/ReviewWithComments/ReviewWithComments';
import { useBookingData } from '../../hooks/useBookingData';
import { IParentServiceMachineService } from '../../models/IParentMachineService';
import { containerStyles } from '../../styles/Stack.style';
import { useSelector } from '@xstate/react';
import { SchedulingWizardService } from '../../machines';
import ErrorState from '../../components/atoms/InfoState/ErrorState';

export const ReviewBooking: FC<{ parentService: IParentServiceMachineService }> = ({ parentService }) => {
    const t = useTranslation();
    const [comments, setComments] = useState<string>();
    const bookingData = useBookingData(parentService);
    const bookingError = useSelector(parentService as SchedulingWizardService, state => state.context.bookingError);

    return (
        <Stack styles={containerStyles} as="section">
            { bookingError ? (
                <>
                    <ErrorState 
                        title={t(bookingError)}
                    />
                    <Stack tokens={pickerFooterGap} horizontalAlign="end" styles={pickerFooterStyles} >
                        <PrimaryButton
                            text={t('SCHEDULE_MEETING.ACTION_CHOOSE_DIFFERENT')}
                            onClick={() => parentService.send({ type: WIZARD_EVENTS.PREV })}
                        />
                    </Stack>
                </>
            ) : (
                <>
                    <ReviewWithComments {...bookingData} onCommentChange={setComments} />
                    <Stack styles={pickerFooterStyles} horizontal tokens={pickerFooterGap} horizontalAlign="space-between">
                        <DefaultButton text={t(WIZARD_EVENTS.PREV)} onClick={() => parentService.send(WIZARD_EVENTS.PREV)} />
                        <PrimaryButton
                            text={t('SCHEDULE_MEETING.ACTION_SCHEDULE')}
                            onClick={() => parentService.send({ type: WIZARD_EVENTS.NEXT, data: comments })}
                        />
                    </Stack>
                </>
            )}
        </Stack>
    );
};

export default ReviewBooking;
