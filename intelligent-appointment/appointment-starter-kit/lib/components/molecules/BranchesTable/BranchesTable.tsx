// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { FC, useEffect, useMemo } from 'react';
import {
    DetailsList,
    IColumn,
    SelectionMode,
    Selection,
    DetailsRow,
    IDetailsListProps,
    IDetailsRowProps,
    IObjectWithKey,
    mergeStyles,
    FontSizes,
    NeutralColors
} from '@fluentui/react';
import { ContextualWrapper } from '../../atoms/ContextualWrapper/ContextualWrapper';
import { BranchPickerService } from '../../../machines/branchPicker.machine';
import { useSelector } from '@xstate/react';
import { useTranslation } from '../../../hooks/useTranslation';
import { IBranch } from '../../../models/IBranch';
import { EmptyState } from '../../atoms/InfoState/EmptyState';

interface IBranchesTableProps {
    service: BranchPickerService;
}

const columns: IColumn[] = [
    {
        key: 'name',
        name: 'MEETING_BRANCH_PICKER.TABLE_COLUMNS.NAME',
        fieldName: 'name',
        data: 'string',
        isPadded: true,
        isRowHeader: true,
        minWidth: 100,
        maxWidth: 200,
    },
    {
        key: 'address',
        name: 'MEETING_BRANCH_PICKER.TABLE_COLUMNS.ADDRESS',
        fieldName: 'address',
        data: 'string',
        isPadded: true,
        isRowHeader: true,
        minWidth: 100,
        onRender: item => {
            return <div>{Object.values(item.address).filter(Boolean).join(', ')}</div>;
        },
    },
];

const noteClassName = mergeStyles({
    fontSize: FontSizes.size10,
    color: NeutralColors.gray130,
    marginBlock: '8px',
});

const onRenderRow: IDetailsListProps['onRenderRow'] = (props?: IDetailsRowProps) => {
    if (!props) return null;

    return <DetailsRow {...props} styles={{ root: { border: 'none' } }} data-testid='branch-item' />;
};

export const BranchesTable: FC<IBranchesTableProps> = ({ service }) => {
    const branches = useSelector(service, state => state.context.branches);
    const selectedBranch = useSelector(service, state => state.context.selectedBranch);
    const t = useTranslation();

    columns[0].name = t(columns[0].name);
    columns[1].name = t(columns[1].name);

    const selection = useMemo(
        () =>
            new Selection({
                onSelectionChanged: () => {
                    const selecteds = selection.getSelection();
                    selecteds.length && service.send({ type: 'SELECT_BRANCH', data: (selecteds[0] as IBranch) });
                },
            }),
        [service]
    );

    useEffect(() => {
        if (!selectedBranch) {
            return;
        }
        selection.setAllSelected(false);

        const index = branches.findIndex(item => item.id === selectedBranch.id);

        if (index !== -1) {
            selection.setIndexSelected(index, true, false);
        }
    }, [branches]);

    return (
        <ContextualWrapper service={service}>
            { branches.length ?  (
            <>
                <DetailsList
                    columns={columns}
                    items={branches}
                    selectionMode={SelectionMode.single}
                    isHeaderVisible
                    selection={selection}
                    selectionPreservedOnEmptyClick
                    checkButtonAriaLabel={t('MEETING_BRANCH_PICKER.TABLE_COLUMNS.ROW_SELECT_LABEL')}
                    getKey={item => item.id}
                    onRenderRow={onRenderRow}
                    styles={{ root: { flexGrow: 1 } }}
                />
                <p className={noteClassName}>{t('MEETING_BRANCH_PICKER.TABLE_COLUMNS.DISCLAIMER')}</p>
            </>
            ) : (
                <EmptyState
                    title={t('INFO_STATE.EMPTY_STATE.NO_AVAILABLE_BRANCH.TITLE')}
                    subtitle={t('INFO_STATE.EMPTY_STATE.NO_AVAILABLE_BRANCH.SUBTITLE')}
                />
            )}
        </ContextualWrapper>
    );
};
