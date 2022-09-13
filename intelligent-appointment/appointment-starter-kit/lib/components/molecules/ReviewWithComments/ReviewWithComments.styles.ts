// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { FontSizes } from '@fluentui/theme';
import { FontWeights, mergeStyleSets, NeutralColors } from '@fluentui/react';

export const baseStyles = mergeStyleSets({
    container: { 
        borderBlockStart: `1px solid ${NeutralColors.gray30}`, 
        padding: '24px 32px',
        flex: 1,
    },
    title: {
        margin: 0,
        marginBlockEnd: '24px',
        fontSize: FontSizes.size20,
        fontWeight: FontWeights.semibold,
        lineHeight: '28px',
    },
    detailsList: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        rowGap: '10px',
        margin: 0,
        marginBlockEnd: '29px',
        padding: 0,
        listStyle: 'none',
    },
    detailsItem: {
        minWidth: '100px',
        maxWidth: '172px',
        marginInlineEnd: '16px',
    },
    additionalInfo: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))',
        gap: '24px',
        alignItems: 'baseline',
        '& > *:only-child': {
            maxWidth: '70ch',
        },
        fontSize: FontSizes.size12,
        lineHeight: '16px',
    },
    instructions: {
        listStyleType: 'none',
        lineHeight: '20px',
        paddingInlineStart: 0,
    },
    instructionsTitle: {
        margin: 0,
        fontSize: FontSizes.size14,
        fontWeight: FontWeights.semibold,
        lineHeight: '20px',
    },
    commentsWrapper: {},
    commentsTitle: {
        margin: 0,
        fontSize: FontSizes.size14,
        fontWeight: FontWeights.semibold,
        lineHeight: '20px',
    },
    comments: { margin: 0 },
});

export const infoStateStyles = {
    icon: { marginBlockEnd: '29px' },
};
