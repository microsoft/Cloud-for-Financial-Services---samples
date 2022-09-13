// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { FontWeights, mergeStyleSets, mergeStyles, FontSizes, NeutralColors } from '@fluentui/react';
import { COLORS } from '../../../helpers/colors.helper';

export const DateRangeStyles = mergeStyleSets({
    root: {
        padding: '20px 24px',
    },
    rangeOptions: { marginInlineEnd: '16px', marginBlockStart: '25px' },
});

export const CalendarStyles = {
    root: {
        selectors: {
            '.ms-CalendarDay-daySelected': {
                backgroundColor: 'transparent !important',
            },
            '.ms-CalendarDay-daySelected > button': {
                backgroundColor: COLORS.dynamicPrimary,
                borderRadius: '50%',
                color: NeutralColors.white,
                fontWeight: FontWeights.semibold,
            },
        },
    },
};

export const DateRangeFooterStyles = { childrenGap: 6 };

export const dateRangeHeaderStyleClass = mergeStyles({ color: NeutralColors.gray160, fontWeight: FontWeights.semibold as any, marginBlock: '0px' });

export const dateRangeWrapperStyles = { root: { paddingBlockStart: '16px' } };

export const calendarHeaderClass = mergeStyles({
    fontWeight: FontWeights.light as any,
    color: NeutralColors.gray130,
    fontSize: FontSizes.size12,
    paddingInline: '12px',
});
