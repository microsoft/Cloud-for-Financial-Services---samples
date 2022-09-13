import { NeutralColors, mergeStyles, FontWeights } from '@fluentui/react';

export const TopicCardStyle = {
    root: {
        backgroundColor: 'inherit',
        color: NeutralColors.gray160,
        padding: '12px',
        display: 'inline-flex',
        height: 'inherit',
        width: '250px'
    },
};

export const TopicCardHeaderStyles = { root: { fontWeight: FontWeights.semibold, color: NeutralColors.gray160 } };

export const TopicCardBodyStyles = { root: { marginTop: '5px' } };

export const IconClass = mergeStyles({ fontSize: 18 });
