// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { FontSizes, NeutralColors, FontWeights } from '@fluentui/theme';
import { mergeStyleSets } from '@fluentui/react';
import { IInfoStateProps } from './InfoState.interface';

export const getClassNames = (props: IInfoStateProps) => {
    const { iconSize = 48 } = props;

    return mergeStyleSets(
        {
            container: {
                padding: '35px',
                height: '100%',
                width: '100%',
                textAlign: 'center',
            },
            icon: {
                width: iconSize,
                maxWidth: iconSize,
                marginBlockEnd: 41,
            },
            title: {
                marginBlockEnd: 8,
                fontSize: FontSizes.size18,
                fontWeight: 600,
                whiteSpace: 'pre-line',
                lineHeight: '24px',
                textAlign: 'center',
                color: NeutralColors.gray160,
            },
            subtitle: {
                lineHeight: '20px',
                whiteSpace: 'pre-line',
                fontSize: FontSizes.size14,
                fontWeight: FontWeights.light,
                color: NeutralColors.gray130,
            },
        },
        props.styles
    );
};
export const imageStyle = { image: { width: '100%' } };
