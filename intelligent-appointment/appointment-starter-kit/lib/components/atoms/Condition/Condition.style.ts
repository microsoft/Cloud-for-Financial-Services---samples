
import { mergeStyles, FontWeights, FontSizes, NeutralColors } from '@fluentui/react';
import { COLORS } from '../../../helpers/colors.helper';

const subTextStyle = {
    fontSize: FontSizes.size12,
    color: NeutralColors.gray130
}

export const subTextClassName = mergeStyles(subTextStyle)

export const prefixStyle = mergeStyles({
    ...subTextStyle,
    fontWeight: FontWeights.semibold,
})

export const linkStyles = {
    root: {
        fontSize: FontSizes.size14,
        color: COLORS.dynamicPrimary,
        fontWeight: FontWeights.semibold
    }
}