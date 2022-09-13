// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { useTranslation } from '../../hooks/useTranslation';
import { useActor } from '@xstate/react';
import React, { useContext } from 'react';
import { DateRange } from '../../components/atoms/DateRange/DateRange';
import { DateRangeSelection } from '../../components/atoms/DateRange/DateRange.interface';
import { DialogMachineInterpreter, DialogManagerContext } from '../../contexts/DialogManager/DialogManager';
import { rangeOptions } from '../../helpers/date.helper';

export const DateRangePickerModal = () => {
    const t = useTranslation();
    const { dialogManager } = useContext(DialogManagerContext);
    const [state, send] = useActor(dialogManager as DialogMachineInterpreter);

    return (
        <DateRange
            rangeOptions={rangeOptions.map(option => ({ ...option, text: t(option.text) }))}
            selectedDays={state.context.dataToSubmit as DateRangeSelection}
            onSelectDays={(selectedDays: DateRangeSelection) => send({ type: 'UPDATE_DATA', data: selectedDays })}
        />
    );
};

export default DateRangePickerModal;
