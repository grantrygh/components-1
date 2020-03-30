/** @jsx jsx */
import { jsx } from '@emotion/core';
import useBadgeStyle from '../Badge/styles';
import Box from '../Box';
import Icon from '../Icon';
import PseudoBox from '../PseudoBox';
import { useVariantColorWarning } from '../utils';
import useTagStyle, { useTagIconStyle } from './styles';
import { TagCloseButtonProps, TagIconProps, TagLabelProps, TagProps } from './types';

export const TagCloseButton = ({ isDisabled, ...props }: TagCloseButtonProps) => (
    <PseudoBox
        as="button"
        display="flex"
        alignItems="center"
        justifyContent="center"
        transition="all 0.2s"
        rounded="full"
        size="1.25rem"
        outline="none"
        ml={1}
        mr={-1}
        opacity="0.5"
        disabled={isDisabled}
        _disabled={{
            opacity: '40%',
            cursor: 'not-allowed',
            boxShadow: 'none',
        }}
        _focus={{
            boxShadow: 'outline',
            bg: 'rgba(0, 0, 0, 0.14)',
        }}
        _hover={{
            opacity: '0.8',
        }}
        _active={{
            opacity: '1',
        }}
        {...props}
    >
        <Icon size="18px" name="small-close" focusable={false} />
    </PseudoBox>
);

export const TagIcon = ({ icon, ...props }: TagIconProps) => {
    const tagIconStyleProps = useTagIconStyle();
    if (typeof icon === 'string') {
        return <Icon name={icon} {...tagIconStyleProps} {...props} />;
    }

    return <Box as={icon} focusable="false" color="currentColor" {...tagIconStyleProps} {...props} />;
};

export const TagLabel = (props: TagLabelProps) => <Box isTruncated lineHeight="1.2" as="span" {...props} />;

export const Tag = ({ variant = 'subtle', size = 'lg', variantColor = 'gray', ...rest }: TagProps) => {
    useVariantColorWarning('Tag', variantColor);
    const badgeStyleProps = useBadgeStyle({ color: variantColor, variant });
    const tagStyleProps = useTagStyle({
        size,
    });

    return (
        <PseudoBox
            {...badgeStyleProps}
            display="inline-flex"
            alignItems="center"
            maxW="100%"
            {...tagStyleProps}
            {...rest}
        />
    );
};
