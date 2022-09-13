import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react';
import React, { FC, useMemo } from 'react';
import { ITopicCardProps, TopicCard } from '../../atoms/TopicCard';
import type { ITopicCardChoiceGroupProps } from './TopicCardChoiceGroup.interface';
import { groupOptionsStyle, ChoiceStyle } from './TopicCardChoiceGroup.style';

export const TopicCardChoiceGroup: FC<ITopicCardChoiceGroupProps> = ({ header, topics, selectedTopic, onSelect }) => {
    const options: IChoiceGroupOption[] = useMemo(
        () =>
            topics.map((topic: ITopicCardProps) => ({
                text: topic.name,
                key: topic.id || topic.name,
                styles: ChoiceStyle,
                onRenderLabel: () => <TopicCard name={topic.name} description={topic.description} key={topic.id} id={topic.id} icon={topic.icon} />,
            })),
        [topics]
    );

    return <ChoiceGroup label={header} defaultSelectedKey={selectedTopic} options={options} styles={groupOptionsStyle} onChange={onSelect} />;
};

export default TopicCardChoiceGroup;
