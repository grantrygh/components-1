/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Box } from '../Box';
import useInputStyle from '../Input/styles';
import useInputAddonStyle from './styles';
import { InputAddonProps } from './types';

const InputAddon = ({ placement = 'left', size = 'md', ...props }: InputAddonProps) => {
    const inputStyleProps = useInputStyle({
        size,
        variant: 'outline',
    });

    const inputAddonStyleProps = useInputAddonStyle({
        placement,
    });

    return <Box {...inputStyleProps} {...inputAddonStyleProps} {...props} />;
};

const InputLeftAddon = (props: InputAddonProps) => <InputAddon placement="left" {...props} />;
const InputRightAddon = (props: InputAddonProps) => <InputAddon placement="right" {...props} />;

export { InputAddon, InputLeftAddon, InputRightAddon };
