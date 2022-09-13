// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React from 'react';
import { render } from '@testing-library/react';
import { ContextualWrapper } from './ContextualWrapper';

describe('ContextualWrapper', () => {
    const fakeService = {
        send: vi.fn(),
        subscribe: () => {
            return {
                unsubscribe: () => {},
            };
        },
        state: {
            context: {
                isLoading: false,
                error: false,
            }
        }
    };

    it('renders the component correctly', () => {
        const { container, getByText } = render(
            <ContextualWrapper service={fakeService as any}>
                <div>Hello</div>
            </ContextualWrapper>);
        expect(container).toBeInTheDocument();
        expect(getByText('Hello')).toBeInTheDocument();
    });

    it('should render loading state', () => {
        const mockService = {
            ...fakeService,
            state: {
                context: {
                    isLoading: true,
                }
            }
        }

        const { queryByText } = render(
            <ContextualWrapper service={mockService as any}>
                <div>Hello</div>
            </ContextualWrapper>);
        expect(queryByText('CONNECTING_TO_SERVER')).toBeVisible();
        expect(queryByText('Hello')).toBeNull();
    });

    it('should render error state', () => {
        const mockService = {
            ...fakeService,
            state: {
                context: {
                    error: true,
                }
            }
        }

        const { queryByText } = render(
            <ContextualWrapper service={mockService as any}>
                <div>Hello</div>
            </ContextualWrapper>);
        expect(queryByText('CONNECTING_TO_SERVER')).toBeNull();
        expect(queryByText('Hello')).toBeNull();
        expect(queryByText('INFO_STATE.ERROR_STATE.TITLE')).toBeVisible();
        expect(queryByText('INFO_STATE.ERROR_STATE.SUBTITLE')).toBeVisible();
    });
});