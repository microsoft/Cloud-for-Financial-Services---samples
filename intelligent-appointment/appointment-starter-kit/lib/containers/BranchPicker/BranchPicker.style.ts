// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { mergeStyles, FontWeights, FontSizes, NeutralColors, IStackStyles } from '@fluentui/react';
import { wizardCommonStyles } from '../../styles/Stack.style';

export const pickerFooterStyles = {
    root: {
        marginBlockStart: '8px',
        padding: '16px 32px',
        borderBlockStart: `1px solid ${NeutralColors.gray30}`,
    },
};
export const pickerFooterGap = { childrenGap: 8 };

export const branchPickerHeaderStyles = { root: { paddingBlockEnd: '24px' } };
export const branchPickerHeaderSubtitleStyles = {
    root: {
        fontSize: FontSizes.size16,
        color: NeutralColors.gray130,
        fontWeight: FontWeights.semibold,
    },
};
export const branchPickerTitleClassName = mergeStyles({
    fontSize: FontSizes.size20,
    textAlign: 'start',
    marginBlockEnd: '0px',
});

export const branchPickerStyles = {
    root: { ...wizardCommonStyles, flexGrow: 1, height: '100%' },
};
export const branchPickerViewStyles: IStackStyles = {
    root: {
        padding: '24px',
        flexGrow: 1,
        overflow: 'auto',
        selectors: {
            '.ms-Viewport': {
                flex: 1,
            },
            '.ms-DetailsList': {
                height: '100%',
            },
        },
    },
};

export const branchesTableModalStyles = {
    root: { height: 'calc(100% - 10px)' },
};

export const subtitleClassName = mergeStyles({
    marginInlineEnd: '5px',
});
