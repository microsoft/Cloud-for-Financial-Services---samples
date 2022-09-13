// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { FC } from 'react';
import { useTranslation } from '../../../hooks/useTranslation';
import format from 'date-fns/format';
import CalendarClockIcon from '../../icons/CalendarClockIcon';
import LocationIcon from '../../icons/LocationIcon';
import ChatMultipleIcon from '../../icons/ChatMultipleIcon';
import { MeetingInfo } from '../../atoms/MeetingInfo';
import { baseStyles } from './ReviewWithComments.styles';
import { IBookingInfos, IReviewWithCommentsProps } from './ReviewWithComments.interface';
import { TextEditor } from '../../atoms/TextEditor';
import PersonSupportIcon from '../../icons/PersonSupportIcon';

const MeetingInstructions: FC<{ instructions: string; title: string }> = ({ instructions, title }) => {
    const instructionsText = instructions
        ?.split('\n')
        .filter(Boolean)
        .map((line: string, index: number) => <li key={index}>{line.trim()}</li>);

    return (
        <article>
            <h2 className={baseStyles.instructionsTitle}>{title}</h2>
            <ul className={baseStyles.instructions}>{instructionsText}</ul>
        </article>
    );
};

const AdditionalInfoItems: FC<IBookingInfos> = ({ branch, timeSlot, meetingTopicName, meetingType, agent }) => {
    const t = useTranslation();

    const ariaName = t('SCHEDULE_MEETING.APPOINTMENT_INFO');

    const locationDescription = branch
        ? ([
              branch.name,
              branch.address.streetOne,
              branch.address.streetTwo,
              `${branch.address.city || ''}, ${branch.address.state || ''} ${branch.address.postcode || ''}`,
              branch.address.phoneNumber,
          ] as string[])
        : t('MEETING_TIMESLOT_PICKER.FILTER_LOCATION.VIRTUAL');

    const dateTime = timeSlot ? [format(timeSlot.startTime, 'MMM dd, yyyy'), format(timeSlot.startTime, 'hh:mm a')] : '';

    const infoData = [
        {
            title: 'SCHEDULE_MEETING.DATE_TIME',
            description: dateTime,
            iconProps: { icon: <CalendarClockIcon /> },
        },
        {
            title: 'SCHEDULE_MEETING.LOCATION',
            description: locationDescription,
            iconProps: { icon: <LocationIcon /> },
        },
        {
            title: 'SCHEDULE_MEETING.TOPIC',
            description: `${meetingTopicName} / ${meetingType.name}`,
            iconProps: { icon: <ChatMultipleIcon /> },
        },
        {
            title: 'SCHEDULE_MEETING.AGENT',
            description: `${agent?.name || timeSlot?.advisors?.[0]?.name}`,
            iconProps: { icon: <PersonSupportIcon /> },
            hidden: !agent && !timeSlot?.advisors[0],
        },
    ];

    return (
        <ul className={baseStyles.detailsList} role="list">
            {infoData.map(({ title, description, iconProps, hidden }) => {
                return !hidden && (
                    <li className={baseStyles.detailsItem} key={title} data-testid="meeting-info-section">
                        <MeetingInfo title={t(title)} ariaName={ariaName} description={description} iconProps={iconProps} />
                    </li>
                );
            })}
        </ul>
    );
};

export const ReviewWithComments: FC<IReviewWithCommentsProps> = ({ isCommentReadonly, onCommentChange, comments, ...props }) => {
    const t = useTranslation();

    return (
        <div className={baseStyles.container}>
            <h1 className={baseStyles.title}>{t('SCHEDULE_MEETING.HEADER')}</h1>
            <AdditionalInfoItems {...props} />
            <aside className={baseStyles.additionalInfo}>
                <MeetingInstructions
                    instructions={props.meetingType.customerInstructions || t('NA')}
                    title={t('SCHEDULE_MEETING.PREPARE_NOTE.TITLE')}
                />
                <div className={baseStyles.commentsWrapper}>
                    {isCommentReadonly ? (
                        <div>
                            <h2 className={baseStyles.commentsTitle}>{t('SCHEDULE_MEETING.COMMENT_SECTION.TITLE')}</h2>
                            <p className={baseStyles.comments}>{comments || t('N/A')}</p>
                        </div>
                    ) : (
                        <TextEditor
                            label={t('SCHEDULE_MEETING.COMMENT_SECTION.LABEL')}
                            placeholder={t('SCHEDULE_MEETING.COMMENT_SECTION.PLACEHOLDER')}
                            onChange={onCommentChange}
                            defaultValue={comments}
                        />
                    )}
                </div>
            </aside>
        </div>
    );
};

export default ReviewWithComments;
