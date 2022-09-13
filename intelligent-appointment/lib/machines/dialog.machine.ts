import { createMachine, assign } from 'xstate';
import { ReactElement } from 'react';

export interface DialogMachineContext {
    action?: (data?: any) => Promise<any>;
    error?: string;
    Component?: ReactElement;
    title?: string;
    acceptButtonText?: string;
    cancelButtonText?: string;
    dataToSubmit?: any;
    hideFooter?: boolean;
}

export const DIALOG_EVENTS = {
    CANCEL: 'CANCEL',
    CONFIRM: 'CONFIRM',
    OPEN_DIALOG: 'OPEN_DIALOG',
} as const;

export type DialogMachineEvent =
    | {
          type: 'OPEN_DIALOG';
          data: {
              action: (data?: any) => Promise<any>;
              Component: ReactElement;
              title?: string;
              acceptButtonText?: string;
              cancelButtonText?: string;
              dataToSubmit?: any;
              hideFooter?: boolean;
          };
      }
    | {
          type: 'CONFIRM';
      }
    | {
          type: 'CANCEL';
      }
    | {
          type: 'UPDATE_DATA';
          data?: any;
      }
    | {
          type: 'UPDATE_TITLE';
          data: string;
      };

export const dialogMachine = createMachine<DialogMachineContext, DialogMachineEvent>(
    {
        initial: 'closed',
        context: {},
        states: {
            closed: {
                id: 'closed',
                on: {
                    OPEN_DIALOG: {
                        target: 'open',
                        actions: assign({
                            action: (_, event) => event.data.action,
                            Component: (_, event) => event.data.Component,
                            title: (_, event) => event.data.title,
                            acceptButtonText: (_, event) => event.data.acceptButtonText,
                            cancelButtonText: (_, event) => event.data.cancelButtonText,
                            dataToSubmit: (_, event) => event.data.dataToSubmit,
                            hideFooter: (_, event) => event.data.hideFooter,
                        }),
                    },
                },
            },
            open: {
                exit: ['clearError'],
                initial: 'idle',
                states: {
                    idle: {
                        on: {
                            CONFIRM: 'executing',
                            CANCEL: '#closed',
                            UPDATE_DATA: {
                                actions: assign({
                                    dataToSubmit: (_, event) => (event as any).data,
                                }),
                            },
                            UPDATE_TITLE: {
                                actions: assign({
                                    title: (_, event) => (event as any).data,
                                }),
                            },
                        },
                    },
                    executing: {
                        invoke: {
                            src: 'execute',
                            id: 'confirm-dialog',
                            onDone: {
                                target: '#closed',
                                actions: ['clear', 'onSuccess'],
                            },
                            onError: {
                                target: 'idle',
                                actions: 'assignError',
                            },
                        },
                    },
                },
            },
        },
    },
    {
        services: {
            execute: async (context, event) => {
                await context.action?.(context.dataToSubmit);
            },
        },
        actions: {
            assignError: assign({
                error: (_, event) => (event as any).data?.message || 'Error occured',
            }),
            clear: assign({
                action: (_, event) => undefined,
                error: (_, event) => '',
                Component: (_, event) => undefined,
                title: (_, event) => undefined,
                acceptButtonText: (_, event) => undefined,
                cancelButtonText: (_, event) => undefined,
                dataToSubmit: (_, event) => undefined,
                hideFooter: (_, event) => undefined,
            }),
            clearError: assign({
                error: (_, event) => '',
            }),
            onSuccess: () => {
                //do something
            },
        },
    }
);
