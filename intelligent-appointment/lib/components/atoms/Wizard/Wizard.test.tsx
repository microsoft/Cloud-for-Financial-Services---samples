import React from 'react';
import { render, act } from '@testing-library/react';
import { Wizard, WIZARD_EVENTS } from './Wizard';

describe('Wizard', () => {
    it('should render the component', () => {
        const { container } = render(
            <Wizard
                initialStep={0}
            >
                <div>Step 1</div>
                <div>Step 2</div>
                <div>Step 3</div>
            </Wizard>
        );

        expect(container).toBeInTheDocument();
    });

    it('should render the component with initial step', () => {
        const { queryByText } = render(
            <Wizard
                initialStep={1}
            >
                <div>Step 1</div>
                <div>Step 2</div>
                <div>Step 3</div>
            </Wizard>
        );

        expect(queryByText('Step 2')).toBeVisible();
        expect(queryByText('Step 1')).toBeNull();
        expect(queryByText('Step 3')).toBeNull();
    });

    it('should trigger onDone', () => {
        const onDone = vi.fn();

        const { queryByText } = render(
            <Wizard
                initialStep={2}
                onDone={onDone}
            >
                <div>Step 1</div>
                <div>Step 2</div>
                <div>Step 3</div>
            </Wizard>);
        
        const next = queryByText(WIZARD_EVENTS.NEXT);
        next?.click();

        const done = queryByText(WIZARD_EVENTS.DONE);
        expect(onDone).toHaveBeenCalled();
    })

    it('should trigger onNext', async () => {
        const onNext = vi.fn();

        const { queryByText, debug } = render(
            <Wizard
                initialStep={0}
            >
                <div>Step 1</div>
                <div>Step 2</div>
                <div>Step 3</div>
            </Wizard>
        );

        expect(queryByText('Step 1')).toBeVisible();
        expect(queryByText('Step 2')).toBeNull();
        expect(queryByText('Step 3')).toBeNull();

        const next = queryByText(WIZARD_EVENTS.NEXT);
        await act(async () => {
            await next?.click();
        })

        expect(queryByText('Step 1')).toBeNull();
        expect(queryByText('Step 2')).toBeVisible();
        expect(queryByText('Step 3')).toBeNull();
    });

    it('should trigger onPrev', async () => {
        const { queryByText } = render(
            <Wizard
                initialStep={2}
            >
                <div>Step 1</div>
                <div>Step 2</div>
                <div>Step 3</div>
            </Wizard>
        );

        expect(queryByText('Step 1')).toBeNull();
        expect(queryByText('Step 2')).toBeNull();
        expect(queryByText('Step 3')).toBeVisible();

        const prev = queryByText(WIZARD_EVENTS.PREV);
        await act(async () => {
            await prev?.click();
        })

        expect(queryByText('Step 2')).toBeVisible();
        expect(queryByText('Step 1')).toBeNull();
        expect(queryByText('Step 3')).toBeNull();
    })

    it('should change to custom label', async () => {
        const customLabels = {
            nextLabel: 'Forward',
            prevLabel: 'Backward',
            doneLabel: 'Submit',
        };

        const { queryByText } = render(
            <Wizard
                initialStep={2}
                {...customLabels}
            >
                <div>Step 1</div>
                <div>Step 2</div>
                <div>Step 3</div>
            </Wizard>
        );

        expect(queryByText('Forward')).toBeVisible();
        expect(queryByText('Backward')).toBeVisible();

        const next = queryByText('Forward');
        await act(async () => {
            await next?.click();
        })

        expect(queryByText('Forward')).toBeNull();
        expect(queryByText('Backward')).toBeNull();
        expect(queryByText('Submit')).toBeVisible();
    });

    it('should not display prev button for first step', () => {
        const { queryByText } = render(
            <Wizard
                initialStep={0}
            >
                <div>Step 1</div>
                <div>Step 2</div>
                <div>Step 3</div>
            </Wizard>
        );

        expect(queryByText('Backward')).toBeNull();
    });

    it('should render custom header', () => {
        const customHeader = <div>Custom Header</div>;

        const { queryByText } = render(
            <Wizard
                initialStep={0}
                headerComp={customHeader}
            >
                <div>Step 1</div>
                <div>Step 2</div>
                <div>Step 3</div>
            </Wizard>
        );

        expect(queryByText('Custom Header')).toBeVisible();
    })

    it('should hide footer', () => {
        const { queryByText } = render(
            <Wizard
                initialStep={0}
                hideFooter
            >
                <div>Step 1</div>
                <div>Step 2</div>
                <div>Step 3</div>
            </Wizard>
        );

        expect(queryByText(WIZARD_EVENTS.NEXT)).toBeNull();
    })
});