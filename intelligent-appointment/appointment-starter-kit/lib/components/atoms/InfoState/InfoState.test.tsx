import InfoState, { ICON_TEST_ID, ICON_WRAPPER_TEST_ID, INFO_STATE_TEST_ID, SUBTITLE_TEST_ID } from './InfoState';
import { IInfoStateProps } from './InfoState.interface';
import { render } from '@testing-library/react';
import ErrorState from './ErrorState';
import EmptyState from './EmptyState';

describe('InfoState', () => {
    const infoStateProps: IInfoStateProps = {
        title: 'info state title',
    };

    it('should render info state with only title', () => {
        const { getByText, queryByTestId } = render(<InfoState {...infoStateProps} />);

        expect(getByText(infoStateProps.title)).toBeVisible();
        expect(queryByTestId(SUBTITLE_TEST_ID)).toBeNull();
        expect(queryByTestId(ICON_TEST_ID)).toBeNull();
    });

    it('should render with subtitle', () => {
        const props = { ...infoStateProps, subtitle: 'subtitle' };
        const { getByText } = render(<InfoState {...props} />);

        expect(getByText(props.subtitle!)).toBeVisible();
    });

    it('should render with image icon if iconSrc is provided', () => {
        const props = {
            ...infoStateProps,
            iconSrc: 'icon.png',
        };
        const { getByTestId } = render(<InfoState {...props} />);

        const iconWrapper = getByTestId(ICON_WRAPPER_TEST_ID);

        expect(iconWrapper).toBeVisible();

        expect((iconWrapper.querySelector('img') as HTMLImageElement).src).toContain(props.iconSrc);
    });

    it('should render without the icon', () => {
        const { queryByTestId } = render(<InfoState {...infoStateProps} />);

        const iconWrapper = queryByTestId(ICON_WRAPPER_TEST_ID);

        expect(iconWrapper).toBeNull();
    });

    it('should render with custom style', () => {
        const props = {
            ...infoStateProps,
            styles: { container: { padding: 0 } },
        };
        const { getByTestId } = render(<InfoState {...props} />);

        expect(getByTestId(INFO_STATE_TEST_ID)).toHaveStyle({
            padding: '0px 0px 0px 0px',
        });
    });
});

describe('ErrorState', () => {
    const defaultProps = {
        title: 'INFO_STATE.ERROR_STATE.TITLE',
        subtitle: 'INFO_STATE.ERROR_STATE.SUBTITLE',
        ariaLabel: 'INFO_STATE.ERROR_STATE.ARIA_LABEL',
    };

    it('should render with provided texts and icon', () => {
        const { getByText, getByTestId } = render(<ErrorState {...defaultProps} />);

        const titleElem = getByText(defaultProps.title);
        const subtitleElem = getByText(defaultProps.subtitle);

        const iconWrapper = getByTestId(ICON_WRAPPER_TEST_ID);
        const icon = getByTestId(ICON_TEST_ID);

        expect(titleElem).toBeVisible();
        expect(titleElem).toHaveTextContent(defaultProps.title);

        expect(subtitleElem).toBeVisible();
        expect(subtitleElem).toHaveTextContent(defaultProps.subtitle);

        expect(iconWrapper).toBeVisible();
        expect(icon).toBeVisible();
    });

    it('should render with custom styles', () => {
        const props = {
            styles: { container: { width: 1000 } },
        };
        const { getByTestId } = render(<ErrorState {...props} />);

        expect(getByTestId(INFO_STATE_TEST_ID)).toHaveStyle({ width: '1000px' });
    });
});

describe('EmptyState', () => {
    const defaultProps = {
        title: 'INFO_STATE.EMPTY_STATE.TITLE',
        subtitle: 'INFO_STATE.EMPTY_STATE.SUBTITLE',
        ariaLabel: 'INFO_STATE.EMPTY_STATE.ARIA_LABEL',
    };

    it('should render with provided texts and icon', () => {
        const { getByText, getByTestId } = render(
            <EmptyState {...defaultProps} />
        );

        const titleElem = getByText(defaultProps.title);
        const subtitleElem = getByText(defaultProps.subtitle);

        const iconWrapper = getByTestId(ICON_WRAPPER_TEST_ID);
        const icon = getByTestId(ICON_TEST_ID);

        expect(titleElem).toBeVisible();
        expect(titleElem).toHaveTextContent(defaultProps.title);

        expect(subtitleElem).toBeVisible();
        expect(subtitleElem).toHaveTextContent(defaultProps.subtitle);

        expect(iconWrapper).toBeVisible();
        expect(icon).toBeVisible();
    });
});
