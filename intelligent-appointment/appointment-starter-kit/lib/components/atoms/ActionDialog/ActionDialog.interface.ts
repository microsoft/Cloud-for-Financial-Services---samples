import React from 'react';
import { IDialogFooterProps, IDialogProps, IButtonProps } from '@fluentui/react';

export interface ICustomDialogProps extends IDialogProps {
    title?: string;
    acceptButtonText?: string;
    cancelButtonText?: string;
    footerProps?: IDialogFooterProps;
    acceptButtonProps?: IButtonProps;
    cancelButtonProps?: IButtonProps;
    onAccept?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onDismiss?: () => void;
}
