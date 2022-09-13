// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { ReactElement } from 'react';
import { IStyle } from '@fluentui/merge-styles/lib/IStyle';

export interface IInfoStateStyles {
    container?: IStyle;
    icon?: IStyle;
    title?: IStyle;
    subtitle?: IStyle;
}

export const STATES = { ERROR: 'error', EMPTY: 'empty' } as const;

type StateKeys = keyof typeof STATES;

export type InfoStateType = typeof STATES[StateKeys];

export interface IInfoStateProps {
    title: string;
    subtitle?: string;
    icon?: ReactElement;
    iconSrc?: string;
    iconSize?: number;
    styles?: IInfoStateStyles;
    ariaAtomic?: 'false' | 'true';
    ariaLabel?: string;
    state?: InfoStateType;
}
