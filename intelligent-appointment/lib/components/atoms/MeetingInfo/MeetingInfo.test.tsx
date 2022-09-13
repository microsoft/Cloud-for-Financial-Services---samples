import React from 'react';
import { render } from '@testing-library/react';
import MeetingInfo, { MEETING_INFO_ICON_WRAPPER_ID, MEETING_INFO_TEST_ID } from './MeetingInfo';
import { IconComponent } from '../../../test-utils/mocks/icon.mock';

describe('MeetingInfo', () => {
    const mockProps = {
        title: 'Appointment info title',
        ariaName: 'appointment info',
        description: 'Appointment info description',
        iconProps: { icon: <IconComponent id="icon" /> },
    };

    it('should be rendered with title, description and icon', () => {
        const { queryByTestId, queryByText } = render(<MeetingInfo {...mockProps} />);

        const container = queryByTestId(MEETING_INFO_TEST_ID);
        const title = queryByText(mockProps.title);
        const description = queryByText(mockProps.description);
        const icon = container?.querySelector('#icon');

        expect(container).toBeVisible();
        expect(title).toBeVisible();
        expect(description).toBeVisible();
        expect(icon).toBeVisible();
    });

    it('should be rendered with title, and icon only', () => {
        const { queryByTestId, queryByText } = render(<MeetingInfo {...mockProps} description={undefined} />);

        const container = queryByTestId(MEETING_INFO_TEST_ID);
        const title = queryByText(mockProps.title);
        const description = queryByText(mockProps.description);
        const icon = container?.querySelector('#icon');

        expect(container).toBeVisible();
        expect(title).toBeVisible();
        expect(icon).toBeVisible();
        expect(description).toBeNull();
    });

    it('should be rendered with title, and description only', () => {
        const { queryByTestId, queryByText } = render(<MeetingInfo {...mockProps} iconProps={{ icon: undefined }} />);

        const container = queryByTestId(MEETING_INFO_TEST_ID);
        const title = queryByText(mockProps.title);
        const description = queryByText(mockProps.description);
        const iconWrapper = queryByTestId(MEETING_INFO_ICON_WRAPPER_ID);
        const icon = container?.querySelector('#icon');

        expect(container).toBeVisible();
        expect(title).toBeVisible();
        expect(description).toBeVisible();

        expect(iconWrapper).toHaveStyle({
            display: 'none',
        });
        expect(icon).toBeNull();
    });

    it('should be rendered with description as Element', () => {
        const { queryByTestId } = render(<MeetingInfo {...mockProps} description={<div id="descriptionElement">{mockProps.description}</div>} />);

        const container = queryByTestId(MEETING_INFO_TEST_ID);

        const descriptionElem = container?.querySelector('#descriptionElement');

        expect(descriptionElem).toBeVisible();
        expect(descriptionElem?.textContent).toBe(mockProps.description);
    });

    it('should render description in multiple lines', () => {
        const props = {
            title: 'Appointment info title',
            ariaName: 'appointment info',
            description: ['description line 1', 'description line 2'],
        };
        
        const { queryByText } = render(<MeetingInfo {...props} />);
        props.description.forEach((line) => {
            expect(queryByText(line)).toBeVisible();
        });
    })
});
