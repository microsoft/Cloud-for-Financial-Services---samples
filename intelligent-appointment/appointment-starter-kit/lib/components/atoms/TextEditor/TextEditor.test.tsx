// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import TextEditor from './TextEditor';

describe('TextEditor', () => {
    const mockProps = {
        label: 'Text editor label',
    };

    it('should render textEditor with provided label', () => {
        const { getByLabelText, getByTestId } = render(<TextEditor {...mockProps} />);

        expect(getByLabelText(mockProps.label)).toBeInTheDocument();
        expect(getByTestId('text-editor')).toBeInTheDocument();
    });

    it('should call provided onChange method', async () => {
        const comment = 'some comment text';
        const onChange = vi.fn()
        const { getByTestId } = render(<TextEditor {...mockProps} onChange={onChange}  />);

        await act(async () => {
            fireEvent.change(getByTestId('text-editor'), { target: { value: comment } });
        });

        expect(onChange).toHaveBeenCalledWith(comment, expect.anything());
    });
});
