import { FontSizes, FontWeights, mergeStyleSets, NeutralColors } from '@fluentui/react';

export const timeSlotsPerDayStyles = {
    root: { marginBottom: '32px' },
};

export const timeSlotsPerPeriodOfDayStyles = { root: { minWidth: '360px' } };

export const emptyTimeSlotPerDayStyles = { root: { backgroundColor: NeutralColors.gray10, color: NeutralColors.gray90, fontSize: FontSizes.size14, padding: '15px 24px' }};

export const timeSlotsGroupStyles = mergeStyleSets({
    root: { textAlign: 'start', marginBlockEnd: '4px' },
    header: {
        display: 'block',
        fontSize: FontSizes.size14,
        fontWeight: FontWeights.semibold,
        color: NeutralColors.gray160,
    },
    subtitle: {
        display: 'block',
        color: NeutralColors.gray130,
        fontWeight: FontWeights.light,
        fontSize: FontSizes.size12,
    },
    sectionPeriod: {
        color: NeutralColors.gray130,
        fontWeight: FontWeights.light,
        fontSize: FontSizes.size12,
        marginBlockEnd: '4px',
    },
    timeSlots: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridGap: '8px',
    },
});

export const sectionPeriodGap = { childrenGap: 25 };
