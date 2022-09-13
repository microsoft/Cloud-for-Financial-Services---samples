import React, { FC, createContext, useContext } from 'react';
import { ActionDialog as Dialog } from '../../components/atoms/ActionDialog/ActionDialog';
import { Interpreter } from 'xstate';
import { useInterpret, useSelector } from '@xstate/react';
import { dialogMachine, DialogMachineEvent, DialogMachineContext, DIALOG_EVENTS } from '../../machines/dialog.machine';

export interface DialogMachineInterpreter extends Interpreter<DialogMachineContext, any, DialogMachineEvent> {}

export const DialogManagerContext = createContext<{
    dialogManager?: DialogMachineInterpreter;
}>({});

const dialogContentProps = {
    styles: {
        content: {
            width: 'auto',
        },
    },
};

const modalContentProps = {
    styles: {
        main: {
            selectors: {
                '@media (min-width: 700px)': {
                    width: '730px',
                },
            },
        },
        scrollableContent: { display: 'flex' },
    },
};

const footerProps = {
    styles: {
        actionsRight: {
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
        },
    },
};

export const DialogManager: FC<{}> = () => {
    const { dialogManager } = useContext(DialogManagerContext);
    const acceptButtonText = useSelector(dialogManager as DialogMachineInterpreter, state => state.context.acceptButtonText);
    const cancelButtonText = useSelector(dialogManager as DialogMachineInterpreter, state => state.context.cancelButtonText);
    const title = useSelector(dialogManager as DialogMachineInterpreter, state => state.context.title);
    const Component = useSelector(dialogManager as DialogMachineInterpreter, state => state.context.Component);
    const isOpen = useSelector(dialogManager as DialogMachineInterpreter, state => state.matches('open'));
    const hideFooter = useSelector(dialogManager as DialogMachineInterpreter, state => state.context.hideFooter);

    return (
        <Dialog
            title={title}
            isOpen={isOpen}
            acceptButtonText={acceptButtonText}
            cancelButtonText={cancelButtonText}
            onAccept={!hideFooter ? () => dialogManager?.send(DIALOG_EVENTS.CONFIRM as any) : undefined}
            onCancel={!hideFooter ? () => dialogManager?.send(DIALOG_EVENTS.CANCEL as any) : undefined}
            onDismiss={() => dialogManager?.send(DIALOG_EVENTS.CANCEL as any)}
            maxWidth={'calc(100vw - 100px)'}
            dialogContentProps={dialogContentProps}
            modalProps={modalContentProps}
            footerProps={footerProps}
        >
            {Component}
        </Dialog>
    );
};

export const DialogManagerProvider: FC<{}> = ({ children }) => {
    const service = useInterpret(dialogMachine) as unknown as DialogMachineInterpreter;

    return (
        <DialogManagerContext.Provider value={{ dialogManager: service }}>
            {children}
            <DialogManager />
        </DialogManagerContext.Provider>
    );
};
