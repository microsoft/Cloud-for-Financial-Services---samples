// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React from 'react';

export const EmptyStateIcon = props => (
    <svg fill="none" height="49" width="48" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            d="m3.09 9.501h12.91l4 3h24.91c1.154 0 2.09.895 2.09 2v31c0 1.105-.936 2-2.09 2h-41.82c-1.154 0-2.09-.895-2.09-2v-34c0-1.105.936-2 2.09-2z"
            stroke="#bfbfbf"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
        />
        <path
            d="m47 22.34c0-1.016-.936-1.839-2.09-1.839h-24.91l-4-3h-12.91c-1.154 0-2.09.823-2.09 1.84m0-4.84v-11.16c0-1.017.936-1.84 2.09-1.84h12.91l4 3h24.91c1.154 0 2.09.823 2.09 1.84v9.659"
            stroke="#bfbfbf"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
        />
        <g fill="#bfbfbf">
            <circle cx="18" cy="33.501" r="2" />
            <circle cx="24" cy="33.501" r="2" />
            <circle cx="30" cy="33.501" r="2" />
        </g>
    </svg>
);

export default EmptyStateIcon;
