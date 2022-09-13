import React from 'react';
import { render } from '@testing-library/react';
import TopicCard from './TopicCard';
import { ITopicCardProps } from './TopicCard.interface';

const mockProps: ITopicCardProps = {
    name: 'Test',
    description: 'Example',
    id: '1',
};

describe('TopicCard', () => {
    it('should render without icon', () => {
        const { queryByTestId } = render(<TopicCard {...mockProps} />);

        expect(queryByTestId('topic-details-icon')).toBeNull();
    });

    it('should render without description', () => {
        const { queryByTestId } = render(<TopicCard {...mockProps} description="" />);

        expect(queryByTestId('topic-details-description')).toBeNull();
    });

    it('should render with text', () => {
        const { getByText } = render(<TopicCard {...mockProps} />);

        expect(getByText(mockProps.name)).toBeVisible();
    });

    it('should render with description', () => {
        const { getByText } = render(<TopicCard {...mockProps} />);
        const description = mockProps.description;

        expect(getByText(description as string)).toBeVisible();
    });

    it('should render details with icon', () => {
        const { queryByTestId } = render(<TopicCard {...mockProps} icon="savings" />);

        expect(queryByTestId('topic-details-icon')).toBeVisible();
    });
});
