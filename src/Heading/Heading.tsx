import React from 'react';
import { Box } from '../Box';
import useHeadingStyle from './styles';
import { HeadingProps } from './types';

export const Heading = (props: HeadingProps, ref) => {
    const { kind = 'h4', ...rest } = props;
    const headingStyle = useHeadingStyle({ kind });

    return <Box as={kind} {...headingStyle} {...rest} />;
};
