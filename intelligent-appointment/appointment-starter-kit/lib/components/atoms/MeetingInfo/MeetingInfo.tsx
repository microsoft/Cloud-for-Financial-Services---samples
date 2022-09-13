import React, { FC } from 'react';
import { Stack } from '@fluentui/react';
import type { IMeetingInfoProps } from './MeetingInfo.interface';
import { getClassNames, visuallyHiddenStyle } from './MeetingInfo.style';
import { useId } from '@fluentui/react-hooks';

export const MEETING_INFO_TEST_ID = 'meeting-info';
export const MEETING_INFO_ICON_WRAPPER_ID = 'meeting-info-icon-wrapper';

const toParagraph = (paragraphs: string[]) => paragraphs.map((val: string, index: number) => val && <div key={index}>{val}</div>);

export const MeetingInfo: FC<IMeetingInfoProps> = ({
    title,
    ariaName,
    description = '',
    iconProps: { icon: IconComponent, size } = {},
    titleId,
    ariaNameId,
    styles: externalStyles,
}) => {
    const styles = getClassNames(size, externalStyles);

    const defaultTitleID = useId('MeetingInfoTitle');
    const titleID = titleId || defaultTitleID;
    const defaultHiddenTitleID = useId('MeetingInfoSROnlyTitle');
    const hiddenTitleID = ariaNameId || defaultHiddenTitleID;

    return (
        <Stack
            as="article"
            className={styles.container}
            aria-labelledby={`${hiddenTitleID} ${titleID}`}
            data-testid={MEETING_INFO_TEST_ID}
            horizontal
        >
            <h2 className={visuallyHiddenStyle.component} id={hiddenTitleID}>
                {ariaName}
            </h2>
            <Stack as="figure" className={styles.iconWrapper} aria-hidden="true" data-testid={MEETING_INFO_ICON_WRAPPER_ID}>
                {IconComponent}
            </Stack>
            <Stack as="article" className={styles.content}>
                <h3 className={styles.title} id={titleID}>
                    {title}
                </h3>
                <Stack className={styles.description}>{Array.isArray(description) ? toParagraph(description) : description}</Stack>
            </Stack>
        </Stack>
    );
};

export default MeetingInfo;
