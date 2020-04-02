import React, { forwardRef } from 'react';
import Box from '../Box';
import useHeadingStyle from './styles';
import { HeadingProps } from './types';

const Heading = forwardRef((props: HeadingProps, ref) => {
    const { kind = 'h1', ...rest } = props;
    const headingStyle = useHeadingStyle({ kind });

    return <Box ref={ref} as="h2" {...headingStyle} {...rest} />;
});

Heading.displayName = 'Heading';

export default Heading;
