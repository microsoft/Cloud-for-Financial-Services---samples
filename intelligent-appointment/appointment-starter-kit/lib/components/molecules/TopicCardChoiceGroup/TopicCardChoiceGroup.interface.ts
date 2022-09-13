// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { IChoiceGroupOption } from '@fluentui/react';
import React from 'react';
import { ITopicCardProps } from '../../atoms/TopicCard';

export type OnSelectFunc = (e?: React.FormEvent<HTMLElement | HTMLInputElement>, options?: IChoiceGroupOption) => void;

export interface ITopicCardChoiceGroupProps {
    header: string;
    selectedTopic?: string;
    topics: ITopicCardProps[];
    onSelect: OnSelectFunc;
}
