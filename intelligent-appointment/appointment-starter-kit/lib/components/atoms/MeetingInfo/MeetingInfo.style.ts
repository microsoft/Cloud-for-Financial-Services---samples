import { FontSizes, NeutralColors } from '@fluentui/theme';
import { mergeStyleSets } from '@fluentui/react';
import { IMeetingInfoStyles } from './MeetingInfo.interface';

export const getClassNames = (iconSize?: number, styles?: IMeetingInfoStyles) => {
    return mergeStyleSets(
        {
            container: {
                display: 'flex',
                gap: '8px',
                maxWidth: 210,
                padding: '2px',
            },
            iconWrapper: {
                margin: 0,
                width: iconSize,
                maxWidth: iconSize,
                flexShrink: '0 !important',
                ':empty': {
                    display: 'none',
                },
                '& > *': {
                    maxWidth: '100%',
                },
            },
            content: {},
            title: {
                margin: 0,
                fontSize: FontSizes.size12,
                color: NeutralColors.gray160,
            },
            description: {
                fontSize: FontSizes.size14,
                color: NeutralColors.gray130,
            },
        },
        styles
    );
};

export const visuallyHiddenStyle: any = mergeStyleSets({
    component: {
        position: 'fixed',
        overflow: 'hidden',
        clip: 'rect(1px, 1px, 1px, 1px)',
        width: '1px',
        height: '1px',
        margin: 0,
        whiteSpace: 'nowrap',
    },
});
