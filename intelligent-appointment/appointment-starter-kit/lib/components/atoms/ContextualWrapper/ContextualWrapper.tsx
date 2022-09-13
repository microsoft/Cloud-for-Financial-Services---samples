// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { FC } from 'react';
import { Loading } from '../Loading/Loading';
import { useTranslation } from '../../../hooks/useTranslation';
import { Interpreter } from 'xstate';
import { useActor } from '@xstate/react';
import { ErrorState } from '../InfoState/ErrorState';

export const ContextualWrapper: FC<{ service: Interpreter<any, any, any> }> = ({ children, service }) => {
    const [state] = useActor(service);
    const t = useTranslation();

    if (state.context.isLoading) {
        return <Loading label={ t(state.context.loadingTitle) || t('CONNECTING_TO_SERVER')} />;
    }

    if (state.context.error) {
        return (
            <ErrorState
                title={t('INFO_STATE.ERROR_STATE.TITLE')}
                subtitle={t('INFO_STATE.ERROR_STATE.SUBTITLE')}
                ariaLabel={t('INFO_STATE.ERROR_STATE.ARIA_LABEL')}
            />
        );
    }

    return <>{children}</>;
};
