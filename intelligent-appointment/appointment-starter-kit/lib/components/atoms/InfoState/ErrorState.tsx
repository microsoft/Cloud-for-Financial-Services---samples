import React, { FC } from 'react';
import InfoState, { ICON_TEST_ID } from './InfoState';
import { IInfoStateProps, STATES } from './InfoState.interface';
import { mergeStyleSets } from '@fluentui/react';
import ErrorStateIcon from '../../icons/ErrorStateIcon';

export interface IErrorStateProps extends Partial<IInfoStateProps> {}

export const errorStateStyles = {
    icon: {
        marginBlockEnd: 47,
    },
};

export const ErrorState: FC<IErrorStateProps> = props => {
    const errorStateMergedStyles = mergeStyleSets(errorStateStyles, props.styles);
    const { title = '', subtitle } = props;

    return (
        <InfoState
            title={title}
            subtitle={subtitle}
            icon={<ErrorStateIcon data-testid={ICON_TEST_ID} />}
            {...props}
            styles={errorStateMergedStyles}
            state={STATES.ERROR}
        />
    );
};

export default ErrorState;
