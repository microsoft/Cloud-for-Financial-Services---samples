import { FontIcon, Stack, Text } from '@fluentui/react';
import React, { FC } from 'react';
import { childrenTokens } from '../../../styles/Stack.style';
import { ITopicCardProps } from './TopicCard.interface';
import { TopicCardStyle, IconClass, TopicCardHeaderStyles, TopicCardBodyStyles } from './TopicCard.style';

export const TopicCard: FC<ITopicCardProps> = ({ name, description, icon }) => {
    return (
        <Stack verticalAlign="start" tokens={childrenTokens} styles={TopicCardStyle}>
            <Stack horizontal tokens={childrenTokens} verticalAlign="center">
                {icon && <FontIcon iconName={icon} data-testid="topic-details-icon" className={IconClass} />}
                <Text variant="medium" block styles={TopicCardHeaderStyles}>
                    {name}
                </Text>
            </Stack>
            {description && (
                <Text variant="smallPlus" data-testid="topic-details-description" styles={TopicCardBodyStyles}>
                    {description}
                </Text>
            )}
        </Stack>
    );
};

export default TopicCard;
