/** @jsx jsx */
import { jsx } from '@emotion/core';
import Flex from '../Flex';
import Stack from '../Stack';
import Tag, { TagCloseButton, TagLabel } from '../Tag';
import useFullTagStyle, { useFullTagLabelStyle } from './styles';
import { FullTagProps } from './types';

export const FullTag = ({
    variant = 'subtle',
    variantColor = 'gray',
    label,
    subLabel,
    onClose,
    rounded,
    children,
    ...rest
}: FullTagProps) => {
    // Wrong usage of `variantColor` prop is quite common
    // Let's add a warning hook that validates the passed variantColor
    // useVariantColorWarning('Badge', variantColor);

    const fullTagStyleProps = useFullTagStyle({ color: variantColor, variant });

    const fullTagLabelStyleProps = useFullTagLabelStyle({ color: variantColor, variant });

    const fullStyle = {
        h: '56px',
        px: 0,
        overflow: 'hidden',
        // display: 'flex',
    };

    const iconStyle = {
        size: '24px',
        // color: 'white',
    };

    // display: 'inline-block',
    //     px: 1,
    //     textTransform: 'uppercase',
    //     fontSize: 'xs',
    //     borderRadius: 'sm',
    //     fontWeight: 'bold',
    //     whiteSpace: 'nowrap',
    //     verticalAlign: 'middle',

    return (
        <Tag variantColor={variantColor} {...fullStyle} rounded={rounded ? 'full' : 'md'} {...fullTagLabelStyleProps}>
            <Flex
                align="center"
                justify="center"
                {...fullTagStyleProps} // get dark color of variant
                h="100%"
                w="56px"
                rounded={rounded ? 'full' : 'md'}
            >
                {children}
            </Flex>
            <Stack pl={4} pr={8}>
                <TagLabel mb={0} marginBottom={0} pb="2px">
                    {label}
                </TagLabel>
                {subLabel && <TagLabel fontSize="xs">{subLabel}</TagLabel>}
            </Stack>
            {onClose && <TagCloseButton mr={2} onClick={onClose} />}
        </Tag>
    );
};
