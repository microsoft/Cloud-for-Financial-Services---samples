# Wizard Component

This is the new composable wizard component written based on State Machine concept (Xstate).

There are two ways using this component

## Using `Wizard`

This is the renderless component that will compute the state machine based on its children and props. It accepts the following props:

1. `initialStep: number` - first step to start, it is the index of the step component listed in order as `children` of `Wizard`.
2. `onDone: Function` - method to trigger once the wizard has reached the completed stage.
3. `id?: string` - id to define the state machine - _Optional_
4. `headerComp?: ReactElement` - the React component to render instead of the default header (currently there is no header).
5. `nextLabel?: string` - Text label for the Next button, instead of the default 'Next'.5. `nextLabel?: string` - Text label for the Next button, instead of the default 'Next'.
6. `prevLabel?: string` - Text label for the Next button, instead of the default 'Back'.
7. `doneLabel?: string` - Text label for the Next button, instead of the default 'Done'.

The steps should be passed as children component for `Wizard` in order, for example:

```html
<Wizard>
    <div>Step 1</div>
    <div>Step 2</div
    <div>Step 3</div>
>
</Wizard>
```

Also, each step component should have the following props, besides its own props:

1. `validateStep` - _Optional_, function to validate the step before moving on (a condition guard)
2. `onNext` - _Optional_, function to trigger when moving to the next state (sending data, update data in the store, etc)
2. `onPrev` - _Optional_, function to trigger when going back to the prev state (sending data, update data in the store, etc)

**You can use `WizardStep` renderless component to wrap around your step component to ensure its additional props needed for Wizard**

An example code is as below:

```html
<Wizard
    initialStep={1}
    id="my-awesome-wizard"
>
    <WizardStep><MyComponent1/></WizardStep>    
    <WizardStep><MyComponent2/></WizardStep>
    <WizardStep><MyComponent3/></WizardStep>
</Wizard>
```

## Using `WizardCore` with existing state machine

Sometimes when we already have our own machine which is also wizard-type, we want to use directly without asking `Wizard` to compute it for us. In that case, we can use `WizardCore` component with our own machine.

Unlike `Wizard`, the component accepts the following props:

1. `service: Interpreter<any, any, any>;` - interpreted state machine (by using `useInterpret()` or `interpret()` of XState).
2. `headerComp?: ReactElement;` - the React component to render instead of the default header (currently there is no header).
3. `nextLabel?: string` - Text label for the Next button, instead of the default 'Next'.5. `nextLabel?: string` - Text label for the Next button, instead of the default 'Next'.
4. `prevLabel?: string` - Text label for the Next button, instead of the default 'Back'.
5. `doneLabel?: string` - Text label for the Next button, instead of the default 'Done'.

And of course, `children` steps in order.

To create a machine that is compatible with `WizardCore`, you need to pay attention to the following:

1. Each state needs to have `NEXT` event, unless it is last state (with `type: "final"`).
2. Each state that is **not** first state and **not** final state must have `PREV` event with `target` to previous state.
3. Each state, except for final state, should be listed with indexing under `states` property.
4. Final state should be named as `done`.

An example of such machine can be found below:

```js
export const myWizardMachine = createMachine({
    initial: '0',
    id: 'my-wizard-machine', //required
    context: {
        //your own machine data
    },
    states: {
        0: {
            //first state,
            id: 'first-state',
            on: {
                NEXT: {
                    target: '1'
                }
            }
        },
        1: {
            //second state,
            id: 'second-state',
            on: {   
                NEXT: {
                    target: '2'
                },
                PREV: {
                    target: '0'
                }
            }

        },
        done: {
            type: 'final',
            on: {
                DONE: {
                    //...
                }
            }
        }
    }
}
```

You can use the `WizardCore` component as following:

```js
import { myWizardMachine } from '../machines/myWizardMachine';

export const MyWizard = () => {
    const service = useInterpret(myWizardMachine);

    return (
        <WizardCore service={service as any}>
            <WizardStep>Step 1<WizardStep>            
            <WizardStep>Step 2<WizardStep>
            <WizardStep>Step 3<WizardStep>
        </WizardCore>
    );

};

```


