import React, { FC } from 'react';
import type { IConditionProps } from './Condition.interface';
import { Stack, Link } from '@fluentui/react';
import { prefixStyle, linkStyles, subTextClassName } from './Condition.style';

export const Condition: FC<IConditionProps> = ({ prefixLabel, name, action, description, ...props }) => {
    return (
        <Stack verticalAlign="start" {...props}>
            <span className={prefixStyle}>{prefixLabel}</span>
            <Link onClick={action} underline styles={linkStyles}>
                {name}
            </Link>
            <span className={subTextClassName} data-testid="condition-description">
                {description}
            </span>
        </Stack>
    );
};

export default Condition;
