import React, { FC, PropsWithChildren } from 'react';
import {
    Dialog as FluentDialog,
    DialogFooter as FluentDialogFooter,
    DefaultButton,
    PrimaryButton,
    IDialogStyles,
    IModalStyles,
    IDialogContentStyles,
} from '@fluentui/react';
import type { ICustomDialogProps } from './ActionDialog.interface';
import { useTranslation } from '../../../hooks/useTranslation';

const dialogButtonStyles = {
    rootDisabled: {
        // mainly for high-contrast mode, but also helps others to discern whether a button is disabled or not
        cursor: 'not-allowed',
    },
};

export const dialogContentDefaultProps = {
    title: '',
    closeButtonAriaLabel: 'Close',
    showCloseButton: true,
    isMultiline: true,
};

export const mainDialogStyles = {
    main: {
        maxHeight: '80vh',
        display: 'flex',
    },
};

const dialogContentStyles: Partial<IDialogContentStyles> = {
    content: { display: 'flex', flexDirection: 'column' },
    inner: { display: 'flex', flexDirection: 'column', overflow: 'auto' },
    innerContent: { overflow: 'auto' },
};

export const ActionDialog: FC<PropsWithChildren<ICustomDialogProps>> = props => {
    const { children, title = '', acceptButtonText, cancelButtonText, onAccept, onCancel, onDismiss } = props;

    const translate = useTranslation();

    const acceptButtonTranslatedText = acceptButtonText || translate('ACCEPT');
    const cancelButtonTranslatedText = cancelButtonText || translate('CANCEL');
    dialogContentDefaultProps.closeButtonAriaLabel = translate('CLOSE');
    dialogContentDefaultProps.title = title;

    return (
        <FluentDialog
            onDismiss={onDismiss}
            {...props}
            dialogContentProps={{
                ...dialogContentDefaultProps,
                ...props.dialogContentProps,
                styles: dialogContentStyles,
            }}
            modalProps={props.modalProps}
            styles={mainDialogStyles}
        >
            {children}

            {(onAccept || onCancel) && (
                <FluentDialogFooter {...props.footerProps}>
                    {onAccept && (
                        <PrimaryButton
                            {...props.acceptButtonProps}
                            styles={{
                                ...dialogButtonStyles,
                                ...props?.acceptButtonProps?.styles,
                            }}
                            onClick={onAccept}
                            text={acceptButtonTranslatedText}
                            data-testid="acceptBtn"
                        />
                    )}
                    {onCancel && (
                        <DefaultButton
                            {...props.cancelButtonProps}
                            styles={{
                                ...dialogButtonStyles,
                                ...props?.cancelButtonProps?.styles,
                            }}
                            onClick={onCancel}
                            text={cancelButtonTranslatedText}
                            data-testid="cancelBtn"
                        />
                    )}
                </FluentDialogFooter>
            )}
        </FluentDialog>
    );
};

export default ActionDialog;
