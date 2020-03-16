/** @jsx jsx */
import { jsx } from '@emotion/core';
import useBadgeStyle from '../Badge/styles';
import Flex from '../Flex';
import Stack from '../Stack';
import Tag, { TagIcon, TagLabel } from '../Tag';

const FullTag = ({ variant = 'solid', variantColor = 'gray', label, subLabel, rounded, ...rest }) => {
    // Wrong usage of `variantColor` prop is quite common
    // Let's add a warning hook that validates the passed variantColor
    // useVariantColorWarning('Badge', variantColor);

    const badgeStyleProps = useBadgeStyle({ color: variantColor, variant });

    console.log(badgeStyleProps);

    const fullStyle = {
        h: '56px',
        px: 0,
        overflow: 'hidden',
    };

    const iconStyle = {
        size: '24px',
        color: 'white',
    };

    return (
        <Tag variantColor={variantColor} {...fullStyle} rounded={rounded ? 'full' : 'md'}>
            <Flex
                align="center"
                justify="center"
                {...badgeStyleProps} // get dark color of variant
                h="100%"
                w="56px"
                rounded={rounded ? 'full' : 'md'}
            >
                <TagIcon icon="settings" {...iconStyle} />
            </Flex>
            <Stack pl={4} pr={8}>
                <TagLabel mb={0} marginBottom={0} pb="2px">
                    {label}
                </TagLabel>
                {subLabel && <TagLabel fontSize="xs">{subLabel}</TagLabel>}
            </Stack>
        </Tag>
    );
};

export default FullTag;
