// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ReactElement } from 'react';
import { IStyle } from '@fluentui/react';

export interface IMeetingInfoStyles {
    container?: IStyle;
    iconWrapper?: IStyle;
    content?: IStyle;
    title?: IStyle;
    description?: IStyle;
}

export interface IMeetingInfoProps {
    title: string;
    ariaName: string;
    description?: string[] | string | ReactElement;
    iconProps?: {
        icon?: ReactElement;
        size?: number;
    };
    styles?: IMeetingInfoStyles;
    ariaNameId?: string;
    titleId?: string;
}
