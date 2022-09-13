import React, { FC } from 'react';
import { Stack, Image } from '@fluentui/react';
import { getClassNames, imageStyle } from './InfoState.style';
import type { IInfoStateProps } from './InfoState.interface';

export const INFO_STATE_TEST_ID = 'info-state';
export const ICON_WRAPPER_TEST_ID = 'info-state-icon-wrapper';
export const ICON_TEST_ID = 'info-state-icon';
export const TITLE_TEST_ID = 'info-state-title';
export const SUBTITLE_TEST_ID = 'info-state-subtitle';

export const InfoState: FC<IInfoStateProps> = props => {
    const { title, subtitle, iconSrc, ariaAtomic, ariaLabel, state = 'info', icon: IconComponent } = props;

    const styles = getClassNames(props);

    const hasIcon = iconSrc || IconComponent;

    return (
        <Stack
            className={styles.container}
            verticalAlign="center"
            horizontalAlign="center"
            data-testid={INFO_STATE_TEST_ID}
            role="alert"
            aria-label={ariaLabel}
            aria-atomic={ariaAtomic}
            data-state={state}
        >
            {hasIcon && (
                <Stack.Item className={styles.icon} align="center" data-testid={ICON_WRAPPER_TEST_ID} aria-hidden="true">
                    {(iconSrc && <Image alt="" src={iconSrc} styles={imageStyle} data-testid={ICON_TEST_ID} />) || IconComponent}
                </Stack.Item>
            )}
            <Stack className={styles.title} as="h2" data-testid={TITLE_TEST_ID}>
                {title}
            </Stack>
            {subtitle && (
                <Stack data-testid={SUBTITLE_TEST_ID} className={styles.subtitle} as="h3">
                    {subtitle}
                </Stack>
            )}
        </Stack>
    );
};

export default InfoState;
