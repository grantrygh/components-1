import React from 'react';
import { Box } from '../Box';
import useTextStyle from './styles';
import { TextProps } from './types';

export const Text = React.forwardRef((props: TextProps, ref) => {
    const { kind = 'body', state = 'normal' } = props;
    const textStyleProps = useTextStyle({
        kind,
        state,
    });

    return <Box ref={ref} as="p" {...textStyleProps} {...props} />;
});
