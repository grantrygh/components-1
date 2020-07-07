/** @jsx jsx */
import { jsx } from '@emotion/core';
import CloseIcon from 'mdi-react/CloseIcon';
import useBadgeStyle from '../Badge/styles';
import { Box } from '../Box';
import { useVariantColorWarning } from '../hooks/useVariantColorWarning';
import { Icon } from '../Icon';
import { PseudoBox } from '../PseudoBox';
import { Icons } from '../theme/icons';
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
        opacity={0.35}
        disabled={isDisabled}
        _disabled={{
            // @ts-ignore
            opacity: '40%',
            cursor: 'not-allowed',
            boxShadow: 'none',
        }}
        _focus={{
            boxShadow: 'outline',
            bg: 'rgba(0, 0, 0, 0.14)',
        }}
        _hover={{
            opacity: 0.8,
        }}
        _active={{
            opacity: 1,
        }}
        {...props}
    >
        <CloseIcon size={18} focusable={false} />
        {/* <Icon size="18px" name="small-close" focusable={false} /> */}
    </PseudoBox>
);

export const TagIcon = ({ icon, ...props }: TagIconProps) => {
    const tagIconStyleProps = useTagIconStyle();
    if (typeof icon === 'string') {
        return <Icon name={icon as Icons} {...tagIconStyleProps} {...props} />;
    }

    return <Box as={icon} focusable="false" color="currentColor" {...tagIconStyleProps} {...props} />;
};

export const TagLabel = (props: TagLabelProps) => <Box isTruncated lineHeight="1.2" as="span" {...props} />;

export const Tag = ({ variant = 'subtle', size = 'lg', variantColor = 'transparent', ...rest }: TagProps) => {
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
