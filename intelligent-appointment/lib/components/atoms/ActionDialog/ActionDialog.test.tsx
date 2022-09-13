import { ActionDialog } from './ActionDialog'
import { render } from '@testing-library/react'

describe('ActionDialog', () => { 
    it('should render without footer', () => {
        const { container, queryByTestId } = render(
            <ActionDialog
                title="test"
                isOpen
            >
                <div>Hello</div>
            </ActionDialog>
        );

        expect(container).toBeInTheDocument();
        expect(queryByTestId('acceptBtn')).toBeNull();
        expect(queryByTestId('cancelBtn')).toBeNull();
    })

    it('should render with Accept button on footer', () => {
        const { container, getByText, queryByTestId } = render(
            <ActionDialog
                title="test"
                acceptButtonText="Accept"
                onAccept={vi.fn()}
                isOpen
                acceptButtonProps={{
                    root: {}
                }}
            >
                <div>Hello</div>
            </ActionDialog>
        );

        expect(container).toBeInTheDocument();
        expect(getByText('Accept')).toBeInTheDocument();
        expect(queryByTestId('cancelBtn')).toBeNull();
    })

    it('should render with Cancel button on footer', () => {
        const { container, getByText, queryByTestId } = render(
            <ActionDialog
                title="test"
                cancelButtonText="Cancel"
                onCancel={vi.fn()}
                isOpen
                cancelButtonProps={{
                    root: {}
                }}
            >
                <div>Hello</div>
            </ActionDialog>
        );

        expect(container).toBeInTheDocument();
        expect(getByText('Cancel')).toBeInTheDocument();
        expect(queryByTestId('acceptBtn')).toBeNull();
    })
    it('should render with default texts on footer', () => {
        const { container, getByText, queryByTestId } = render(
            <ActionDialog
                title="test"
                onAccept={vi.fn()}
                onCancel={vi.fn()}
                isOpen
            >
                <div>Hello</div>
            </ActionDialog>
        );

        expect(container).toBeInTheDocument();
        expect(getByText('ACCEPT')).toBeInTheDocument();
        expect(getByText('CANCEL')).toBeInTheDocument();
    })
})