// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import React from 'react';

export const ErrorStateIcon = props => (
    <svg fill="none" height="49" width="48" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            d="M5 47.501v-12h4a6 6 0 0 1 0 12zm-1-3H1m3-6H1m42-37v12h-4a6 6 0 0 1 0-12zm1 3h3m-3 6h3m-42 20v-23h28"
            stroke="#bfbfbf"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
        />
        <path d="M43 18.501v23H15" stroke="#bfbfbf" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        <g fill="#bfbfbf">
            <circle cx="18" cy="24.501" r="2" />
            <circle cx="24" cy="24.501" r="2" />
            <circle cx="30" cy="24.501" r="2" />
        </g>
    </svg>
);

export default ErrorStateIcon;
