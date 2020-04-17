/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Box } from '../Box';
import useKbdStyle from './styles';
import { KeyboardKeyProps } from './types';

export const Kbd = (props: KeyboardKeyProps) => {
    const kbdStyleProps = useKbdStyle({
        //
    });
    return <Box as="kbd" {...kbdStyleProps} {...props} />;
};
