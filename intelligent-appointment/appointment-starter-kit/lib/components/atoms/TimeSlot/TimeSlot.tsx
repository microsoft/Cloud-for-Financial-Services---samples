// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React, { FC } from 'react';
import { toDate } from '../../../helpers/date.helper';
import { DefaultButton } from '@fluentui/react';

export const DEFAULT_FORMAT = 'hh:mm aa';

export interface ITimeSlotProps {
    time: Date;
    itemIndex: number;
    isSelected?: boolean;
    onSelect?: () => void;
    timeFormat?: string;
}
export const TimeSlot: FC<ITimeSlotProps> = React.memo(({ time, itemIndex, timeFormat = DEFAULT_FORMAT, isSelected = false, onSelect }) => {
    return (
        time && (
            <DefaultButton
                data-is-focusable
                data-selection-index={itemIndex}
                data-is-selected={isSelected}
                data-testid="timeslot"
                onClick={onSelect}
                checked={isSelected}
            >
                {toDate(time, timeFormat)}
            </DefaultButton>
        )
    );
});

export default React.memo(TimeSlot);
