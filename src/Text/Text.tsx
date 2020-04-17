import React from 'react';
import { Box } from '../Box';
import useTextStyle from './styles';
import { TextProps } from './types';

export const Text = React.forwardRef((props: TextProps, ref) => {
    const { kind = 'body' } = props;
    const textStyleProps = useTextStyle({
        kind,
    });
    return <Box ref={ref} as="p" {...textStyleProps} {...props} />;
});
