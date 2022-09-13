import { FontSizes } from '@fluentui/react';
import { COLORS } from '../../../helpers/colors.helper';

export const ChoiceStyle = {
    root: {
        marginTop: 0,
    },
    field: {
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: 'transparent',
        maxWidth: '280px',
        minWidth: '205px',
        height: '160px',
        borderRadius: '2px',
        boxShadow: '0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13)',
        selectors: {
            '&.is-checked': {
                borderColor: COLORS.blue,
            },
            '::before': {
                border: 'none',
                backgroundColor: 'transparent',
            },
            '::after': {
                border: 'none',
                backgroundColor: 'transparent !important',
            },
        },
    },
};

export const groupOptionsStyle = {
    root: { padding: '24px 32px', minHeight: 300 },
    label: { fontSize: FontSizes.size20, marginBottom: '24px', textAlign: 'start' },
    flexContainer: { display: 'flex', gap: '24px', flexWrap: 'wrap' },
};
