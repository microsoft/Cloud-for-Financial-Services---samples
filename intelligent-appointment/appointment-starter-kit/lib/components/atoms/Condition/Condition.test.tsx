// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React from 'react';
import { render } from '@testing-library/react';
import Condition from './Condition';

describe('Condition', () => {
    const mockProps = {
        prefixLabel: 'starting',
        name: 'Mon., January 17',
        action: vi.fn(),
        description: 'closest available date'
    };

    it('should render category list after loading', () => {
        const { container } = render(<Condition {...mockProps} />);

        expect(container).toBeInTheDocument();
    });

    it('should trigger action when click', () => {
        const { getByText } = render(<Condition {...mockProps} />);

        const btn = getByText(mockProps.name);

        btn.click();

        expect(mockProps.action).toHaveBeenCalled();
    })

    it('should render without description', () => {
        const props = {
            prefixLabel: 'starting',
            name: 'Mon., January 17',
            action: vi.fn(),
        };

        const { queryByTestId } = render(<Condition {...props} />);

        expect(queryByTestId('condition-description')?.textContent).toEqual('');
    });
});

