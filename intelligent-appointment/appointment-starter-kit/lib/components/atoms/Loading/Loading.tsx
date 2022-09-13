// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { FC } from 'react';
import { Spinner, SpinnerSize, Stack, IStackStyles } from '@fluentui/react';
import { useTranslation } from '../../../hooks/useTranslation';

const loadingStyles: IStackStyles = {
    root: {
        padding: 24,
        flex: 1,
        height: '100%'
    },
};

const spinnerStyles = {
    root: {
        flex: 1
    }
};

export interface ILoadingProps {
    label?: string;
    className?: string;
    spinnerClassName?: string;
    styles?: IStackStyles;
}

export const Loading: FC<ILoadingProps> = ({ label, className, spinnerClassName, styles = loadingStyles }) => {
    const translate = useTranslation();
    const displayLabel = label || translate('LOADING');

    return (
        <Stack styles={styles} className={className} data-testid='loading-spinner'>
            <Spinner 
                size={SpinnerSize.large} 
                label={displayLabel} 
                className={spinnerClassName} 
                ariaLabel={displayLabel} 
                styles={spinnerStyles} 
            />
        </Stack>
    );
};

export default Loading;