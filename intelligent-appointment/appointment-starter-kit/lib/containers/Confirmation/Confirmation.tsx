import React, { FC } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import ReviewWithComments from '../../components/molecules/ReviewWithComments/ReviewWithComments';
import SuccessStateIcon from '../../components/icons/SuccessStateIcon';
import { InfoState } from '../../components/atoms/InfoState';
import { useBookingData, useComments } from '../../hooks/useBookingData';
import { IParentServiceMachineService } from '../../models/IParentMachineService';
import { Stack } from '@fluentui/react';
import { containerStyles } from '../../styles/Stack.style';

export const infoStateStyles = {
    icon: { marginBlockEnd: '29px' },
};

export const Confirmation: FC<{ parentService: IParentServiceMachineService }> = ({ parentService }) => {
    const t = useTranslation();
    const bookingData = useBookingData(parentService);
    const comments = useComments(parentService);

    return (
        <Stack as="section" styles={containerStyles}>
            <ReviewWithComments {...bookingData} isCommentReadonly comments={comments} />
            <InfoState
                title={t('SCHEDULE_MEETING.NOTIFICATIONS.SUCCESS.TITLE')}
                subtitle={t('SCHEDULE_MEETING.NOTIFICATIONS.SUCCESS.SUBTITLE')}
                icon={<SuccessStateIcon />}
                styles={infoStateStyles}
            />
        </Stack>
    );
};

export default Confirmation;
