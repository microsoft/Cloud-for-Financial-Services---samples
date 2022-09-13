import React from 'react';
import { render } from '@testing-library/react';
import { Loading } from './Loading';

describe('Loading', () => {
    it('should show loading spinner with text', () => {
        const { getByTestId, getByText } = render(<Loading />);

        expect(getByTestId('loading-spinner')).toBeVisible();
        expect(getByText('LOADING')).toBeVisible();
    });

    it('should show loading spinner with custom text', () => {
        const customLabel = 'Custom loading label...';
        const { getByTestId, getByText } = render(<Loading label={customLabel} />);

        expect(getByTestId('loading-spinner')).toBeVisible();
        expect(getByText(customLabel)).toBeVisible();
    });
});
