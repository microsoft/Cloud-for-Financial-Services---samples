import React, { FC } from 'react';
import { IInfoStateProps, STATES } from './InfoState.interface';
import InfoState, { ICON_TEST_ID } from './InfoState';
import EmptyStateIcon from '../../icons/EmptyStateIcon';

export interface IEmptyStateProps extends Partial<IInfoStateProps> {}

export const EmptyState: FC<IEmptyStateProps> = props => {
    const { title = '', subtitle } = props;

    return (
        <InfoState title={title} subtitle={subtitle} icon={<EmptyStateIcon data-testid={ICON_TEST_ID} />} {...props} state={STATES.EMPTY}></InfoState>
    );
};

export default EmptyState;
