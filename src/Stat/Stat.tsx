import React, { forwardRef } from 'react';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Icon } from '../Icon';
import { Text } from '../Text';
import useStatStyle from './styles';
import { StatArrowProps, StatGroupProps, StatHelpTextProps, StatLabelProps, StatNumberProps, StatProps } from './types';

const StatLabel = forwardRef((props: StatLabelProps, ref) => {
    const { label: labelStyleProps } = useStatStyle({});
    return <Text ref={ref} {...labelStyleProps} {...props} />;
});

const StatHelpText = forwardRef((props: StatHelpTextProps, ref) => {
    const { help: helpStyleProps } = useStatStyle({});
    return <Text ref={ref} {...helpStyleProps} {...props} />;
});

const StatNumber = (props: StatNumberProps) => {
    const { number: numberStyleProps } = useStatStyle({});
    return <Text {...numberStyleProps} {...props} />;
};

const StatArrow = forwardRef(({ type = 'increase', 'aria-label': ariaLabel, ...rest }: StatArrowProps, ref) => {
    const { arrow: arrowStyleProps } = useStatStyle({
        type,
    });
    return <Icon ref={ref} aria-label={ariaLabel} {...arrowStyleProps} {...rest} />;
});

const Stat = forwardRef((props: StatProps, ref) => {
    const { stat: statStyleProps } = useStatStyle({});
    return <Box ref={ref} position="relative" {...statStyleProps} {...props} />;
});

const StatGroup = forwardRef((props: StatGroupProps, ref) => {
    const { group: groupStyleProps } = useStatStyle({});
    return <Flex ref={ref} {...groupStyleProps} {...props} />;
});

export { StatLabel, StatNumber, Stat, StatHelpText, StatArrow, StatGroup };
