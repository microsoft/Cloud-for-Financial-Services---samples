# Dialog Manager using state machine

Below is the documentation for using `DialogManagerProvider` and supporting components.

## Design intakes

1. There is ONE dialog at a time in a web application regardless.
2. Dialog should not know in advance what component to render, it should act as a render-less component, which renders dynamic component passed by user.

## DialogManagerProvider

This is the global context provider for Dialog Manager. 

## DialogManagerContext

This is the global context of Dialog Manager, exposing only one service `dialogManager` which is a state machine service instance for controlling dialog throughout the application.

`dialogManager` exposes two parameters:

1. `state` - which is the current state of the main dialog - `closed`, `open.idle` (open but haven't had any action triggered), `open.executing` (for executing action ONLY). Once dialog is opened, its default (or initial) state would be `open.idle`.
2. `send` - function to send event to communicate with the dialog manager machine to change state or update data. There are three types of events it receives:

    - `OPEN_DIALOG` - to open dialog with specific configuration. You must pass the following parameters to `data` property of the event:

        a. `action?: () => Promise<any>;` to be triggered when user clicks on call to action button of the dialog (Accept, Confirm, etc.)
        b. `Component?: ReactElement;` - Main Dialog view to render.
        c. `title?: string;` - title of dialog to display.
        d. `acceptButtonText?: string;` - label text for Accept button. By default it will be "Accept".
        e. `cancelButtonText?: string;` - label text for Cancel button. By default it will be "Cancel".

    - `CONFIRM` - trigger the main action of dialog, close the dialog on done or go back to `open.idle` on error, with error message logged.
    - `CANCEL` - dismiss the dialog.

**NOTE** - in general you should only use `send({ type: 'OPEN_DIALOG', data: { /*...*/ }})`. The other 2 events are handled by the `DialogManager` automatically.

## DialogManager

This is the UI Component to render dialog using Dialog FluentUI. It takes the dialogMachine from `DialogManagerContext`, renders and maps the related actions accordingly.