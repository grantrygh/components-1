/** @jsx jsx */
import { jsx } from '@emotion/core';
import { forwardRef } from 'react';
import Box from '../Box';
import Button from '../Button';
import Icon from '../Icon';

const IconButton = forwardRef(({ icon, isRound, 'aria-label': ariaLabel, ...rest }, ref) => {
    // Remove some props before passing it to IconButton
    const { isFullWidth, leftIcon, rightIcon, loadingText, ...props } = rest;

    return (
        <Button p="0" borderRadius={isRound ? 'full' : 'md'} ref={ref} aria-label={ariaLabel} {...props}>
            {typeof icon === 'string' ? (
                <Icon name={icon} focusable="false" color="currentColor" aria-hidden />
            ) : (
                <Box as={icon} aria-hidden focusable="false" color="currentColor" />
            )}
        </Button>
    );
});

IconButton.displayName = 'IconButton';

IconButton.defaultProps = Button.defaultProps;

export default IconButton;
