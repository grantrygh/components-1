/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Text } from '../Text';
import useKbdStyle from './styles';
import { KeyboardKeyProps } from './types';

export const Kbd = (props: KeyboardKeyProps) => {
    const kbdStyleProps = useKbdStyle({
        //
    });
    return <Text as="kbd" {...kbdStyleProps} {...props} />;
};
