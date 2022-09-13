import React, { useContext } from 'react';
import { fireEvent, render, act } from '@testing-library/react';
import { DialogManagerContext, DialogManagerProvider } from './DialogManager';

describe('DialogManagerProvider', () => {
    it('should render without crashing', () => {
        const { container } = render(
            <DialogManagerProvider>
                <div>Hello</div>
            </DialogManagerProvider>
        );
        expect(container).toBeTruthy();
    });
});

describe('DialogManager', () => {
    it('should render with Dialog opened', async () => {
        const MockComp = () => {
            const { dialogManager } = useContext(DialogManagerContext);
            const show = () =>
                dialogManager?.send({
                    type: 'OPEN_DIALOG',
                    data: {
                        Component: <div>Hello</div>,
                        title: 'test',
                        action: () => Promise.resolve('hello'),
                    },
                });

            return (
                <div>
                    <button onClick={show}>Show</button>
                </div>
            );
        };

        const { getByText } = render(
            <DialogManagerProvider>
                <MockComp />
            </DialogManagerProvider>
        );

        const btn = getByText('Show');

        await act(async () => {
            await fireEvent.click(btn);
        });

        expect(getByText('Hello')).toBeInTheDocument();
    });
});
