import React, { forwardRef } from 'react';
import Box from '../Box';
import useHeadingStyle from './styles';
import { HeadingProps } from './types';

const Heading = forwardRef((props: HeadingProps, ref) => {
    const headingStyle = useHeadingStyle(props);

    return <Box ref={ref} as="h2" {...headingStyle} {...props} />;
});

Heading.displayName = 'Heading';

export default Heading;
