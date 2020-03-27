/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Children, cloneElement, isValidElement } from 'react';
import Flex from '../Flex';
import useAvatarGroupStyle from './styles';
import { AvatarGroupProps, MoreIndicatorProps } from './types';

const MoreAvatarLabel = ({ size, label, ...props }: MoreIndicatorProps) => {
    const avatarGroupStyle = useAvatarGroupStyle({
        size,
    });

    return (
        <Flex {...avatarGroupStyle} {...props}>
            {label}
        </Flex>
    );
};

/**
 * AvatarGroup is a wrapper to render a collection of evenly spaced avatars.
 */
export const AvatarGroup = ({ size, children, borderColor, max, spacing = -3, ...rest }: AvatarGroupProps) => {
    const count = Children.count(children);

    const clones = Children.map(children, (child, index) => {
        if (!isValidElement(child)) {
            return null;
        }

        if (max && index > max) {
            return null;
        }

        if (max == null || (max && index < max)) {
            const isFirstAvatar = index === 0;

            return cloneElement(child, {
                ml: isFirstAvatar ? 0 : spacing,
                size,
                borderColor: borderColor || child.props.borderColor,
                showBorder: true,
                zIndex: count - index,
            });
        }

        if (max && index === max) {
            return <MoreAvatarLabel size={size} ml={spacing} label={`+${count - max}`} />;
        }

        return null;
    });

    return (
        <Flex align="center" {...rest}>
            {clones}
        </Flex>
    );
};
