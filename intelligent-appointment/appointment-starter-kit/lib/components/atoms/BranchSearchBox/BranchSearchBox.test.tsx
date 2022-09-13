// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { render, fireEvent, act } from '@testing-library/react';
import { BranchSearchBox } from './BranchSearchBox';
import { BRANCH_PICKER_EVENTS } from '../../../machines/branchPicker.machine';

describe('BranchSearchBox', () => {
    const fakeService = {
        send: vi.fn(),
        subscribe: () => {
            return {
                unsubscribe: () => {},
            };
        },
        state: {
            context: {
                searchTerm: '',
            },
        },
    };

    it('renders the component correctly', () => {
        const { container, queryByPlaceholderText } = render(<BranchSearchBox service={fakeService as any} />);
        expect(container).toBeInTheDocument();
        expect(queryByPlaceholderText('MEETING_BRANCH_PICKER.SEARCH_PLACEHOLDER')).toBeVisible();
    });

    it('should call send when the search box is changed', async () => {
        const { getByPlaceholderText } = render(<BranchSearchBox service={fakeService as any} />);
        const input = getByPlaceholderText('MEETING_BRANCH_PICKER.SEARCH_PLACEHOLDER');

        await act(async () => {
            await fireEvent.change(input, { target: { value: 'test' } });
            fireEvent.keyUp(input, {key: 'Enter', code: 'Enter', charCode: 13})
        });

        expect(fakeService.send).toHaveBeenCalledWith({ type: BRANCH_PICKER_EVENTS.SEARCH, data: 'test' });
    });

    it('should call send with default searchText when search box is changed', async () => {
        const mockService = {
            ...fakeService,
            state: {
                context: {
                    searchTerm: 'test',
                },
            }
        }
        const { getByPlaceholderText } = render(<BranchSearchBox service={mockService as any} />);
        const input = getByPlaceholderText('MEETING_BRANCH_PICKER.SEARCH_PLACEHOLDER');

        await act(async () => {
            await fireEvent.change(input, { target: { value: '' } });
            fireEvent.keyUp(input, {key: 'Enter', code: 'Enter', charCode: 13})
        });

        expect(fakeService.send).toHaveBeenCalledWith({ type: BRANCH_PICKER_EVENTS.SEARCH, data: '' });
    })

    afterEach(() => {
        fakeService.send.mockClear();
    });
});
