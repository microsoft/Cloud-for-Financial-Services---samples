// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { FC, KeyboardEvent } from 'react';
import { SearchBox } from '@fluentui/react';
import { useActor } from '@xstate/react';
import { BranchPickerService, BRANCH_PICKER_EVENTS } from '../../../machines/branchPicker.machine';
import { useTranslation } from '../../../hooks/useTranslation';

const searchBoxStyles = { root: { minWidth: '410px', marginInline: 'auto' } };

export const BranchSearchBox: FC<{ service: BranchPickerService }> = ({ service }) => {
    const [state, send] = useActor(service);
    const t = useTranslation();
    const onSearch = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            send({ type: BRANCH_PICKER_EVENTS.SEARCH as any, data: (event.target as HTMLInputElement).value || '' });
        }
    }

    return (
        <SearchBox
            styles={searchBoxStyles}
            placeholder={t('MEETING_BRANCH_PICKER.SEARCH_PLACEHOLDER')}
            onKeyUp={onSearch}
            defaultValue={state.context.searchTerm}
            disabled={state.context.isLoading}
            onClear={() => send({ type: BRANCH_PICKER_EVENTS.SEARCH as any, data: '' })}
        />
    );
};
