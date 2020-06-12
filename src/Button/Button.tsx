/** @jsx jsx */
import { jsx } from '@emotion/core';
import { forwardRef } from 'react';
import { Box } from '../Box';
import { useVariantColorWarning } from '../hooks/useVariantColorWarning';
import { Icon } from '../Icon';
import { Link } from '../Link';
import { PseudoBox } from '../PseudoBox';
import { Spinner } from '../Spinner';
import { Icons } from '../theme/icons';
import useButtonStyle from './styles';
import { ButtonProps } from './types';

const ButtonIcon = ({ icon, ...props }) => {
    if (typeof icon === 'string') {
        return <Icon focusable={false} name={icon as Icons} color="currentColor" {...props} />;
    }
    const MdiIcon = icon;
    return (
        <Box {...props}>
            <MdiIcon as={icon} data-custom-icon focusable={false} color="currentColor" />
        </Box>
    );
};

export const Button = forwardRef(
    (
        {
            isDisabled,
            isLoading,
            isFullWidth,
            children,
            as: Comp = 'button',
            variantColor = 'button',
            href,
            leftIcon,
            rightIcon,
            variant = 'primary',
            loadingText,
            type = 'button',
            size = 'md',
            iconOnly,
            ...rest
        }: ButtonProps,
        ref
    ) => {
        // Wrong usage of `variantColor` prop is quite common
        // Let's add a warning hook that validates the passed variantColor
        useVariantColorWarning('Button', variantColor);

        const _isDisabled = isDisabled || isLoading;

        const buttonStyleProps = useButtonStyle({
            color: variantColor,
            variant,
            size,
            isDisabled: _isDisabled,
            isFullWidth,
            iconOnly,
        });

        const asButton = href ? Link : Comp;
        return (
            <PseudoBox
                disabled={_isDisabled}
                aria-disabled={_isDisabled}
                ref={ref}
                as={asButton}
                type={type}
                {...buttonStyleProps}
                {...rest}
            >
                {leftIcon && !isLoading && <ButtonIcon mr={!iconOnly && 'spacing-xs'} icon={leftIcon} />}
                {isLoading && (
                    <Spinner
                        position={loadingText ? 'relative' : 'absolute'}
                        mr={loadingText ? 'spacing-xs' : 0}
                        color="currentColor"
                        size="sm"
                    />
                )}
                {isLoading
                    ? loadingText || (
                          <Box as="span" opacity="0">
                              {children}
                          </Box>
                      )
                    : children}
                {rightIcon && !isLoading && <ButtonIcon ml={!iconOnly && 'spacing-xs'} icon={rightIcon} />}
            </PseudoBox>
        );
    }
);
