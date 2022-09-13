// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { act, fireEvent, render } from '@testing-library/react';
import { mockLocations } from '../../../test-utils/mocks/data.mock';
import { BranchesTable } from './BranchesTable'

describe('BranchesTable', () => { 
    const mockServ = {
        send: vi.fn(),
        subscribe: () => {
            return {
                unsubscribe: () => {},
            };
        },
        state: {
            context: {
                branches: []
            }
        }       
    }

    it('should render empty state', () => {
        const { container, getByText } = render(
            <BranchesTable
                service={mockServ as any}
            />
        );
        expect(container).toBeInTheDocument();
        expect(getByText('INFO_STATE.EMPTY_STATE.NO_AVAILABLE_BRANCH.TITLE')).toBeInTheDocument();
        expect(getByText('INFO_STATE.EMPTY_STATE.NO_AVAILABLE_BRANCH.SUBTITLE')).toBeInTheDocument();
    })

    it('should render loading state', () => {
        const service = {
            ...mockServ,
            state: {
                ...mockServ.state,
                context: {
                    ...mockServ.state.context,
                    isLoading: true,
                }
            }
        }
        const { queryByText } = render(
            <BranchesTable
                service={service as any}
            />
        );
        expect(queryByText('CONNECTING_TO_SERVER')).toBeVisible();
        expect(queryByText('INFO_STATE.EMPTY_STATE.NO_AVAILABLE_BRANCH.TITLE')).toBeNull();
    })

    it('should render branches without selected branch', () => {
        const service = {
            ...mockServ,
            state: {
                ...mockServ.state,
                context: {
                    ...mockServ.state.context,
                    branches: mockLocations
                }
            }
        }
        const { container, getByText  } = render(
            <BranchesTable
                service={service as any}
            />
        );
        expect(container).toBeInTheDocument();
        expect(getByText(mockLocations[0].name)).toBeInTheDocument();
        expect(getByText(mockLocations[1].name)).toBeInTheDocument();
        
        expect(container.querySelectorAll('is-selected').length).toEqual(0);
    })

    it('should render branches with selected branch', () => {
        const service = {
            ...mockServ,
            state: {
                ...mockServ.state,
                context: {
                    ...mockServ.state.context,
                    branches: mockLocations,
                    selectedBranch: mockLocations[0]
                }
            }
        }
        const { queryAllByTestId } = render(
            <BranchesTable
                service={service as any}
            />
        );
        
        const firstRow = queryAllByTestId('branch-item')[0];
        expect(firstRow.classList.contains('is-selected')).toBeTruthy();
    });

    it('should trigger send when changing branch', async () => {
        const service = {
            ...mockServ,
            state: {
                ...mockServ.state,
                context: {
                    ...mockServ.state.context,
                    branches: mockLocations,
                    selectedBranch: mockLocations[0]
                }
            }
        }
        const { queryAllByTestId } = render(
            <BranchesTable
                service={service as any}
            />
        );

        await act(async () => {
            await fireEvent.click(queryAllByTestId('branch-item')[1]);
        });
        
        expect(service.send).toHaveBeenCalled();
    });
})