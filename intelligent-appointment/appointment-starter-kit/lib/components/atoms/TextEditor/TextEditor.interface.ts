// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ITextFieldStyles, ITextFieldProps, IStyleFunctionOrObject, ITextFieldStyleProps } from '@fluentui/react';

export interface ITextEditorProps extends Omit<Partial<ITextFieldProps>, 'onChange'> {
    label: string;
    placeholder?: string;
    styles?: IStyleFunctionOrObject<ITextFieldStyleProps, ITextFieldStyles>;
    rows?: number;
    autoAdjustHeight?: boolean;
    onChange?: (newValue?: string, event?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
