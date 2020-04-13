/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import React, { Children, cloneElement, MutableRefObject, useRef } from 'react';
import { Box } from '../Box';
import { useDisclosure } from '../hooks/useDisclosure';
import Popper, { PopperArrow } from '../Popper';
import VisuallyHidden from '../VisuallyHidden';
import useTooltipStyle from './styles';
import { TooltipProps } from './types';

const wrapEvent = (child, theirHandler, ourHandler) => event => {
    if (typeof child !== 'string' && child.props[theirHandler]) {
        child.props[theirHandler](event);
    }

    if (!event.defaultPrevented) {
        return ourHandler(event);
    }

    return null;
};

export const Tooltip = ({
    label,
    'aria-label': ariaLabel,
    showDelay = 0,
    hideDelay = 0,
    placement,
    children,
    hasArrow,
    closeOnClick,
    defaultIsOpen,
    shouldWrapChildren,
    isOpen: controlledIsOpen,
    onOpen: onOpenProp,
    onClose: onCloseProp,
    ...rest
}: TooltipProps) => {
    const { isOpen, onClose, onOpen } = useDisclosure(defaultIsOpen || false);
    const { current: isControlled } = useRef(controlledIsOpen != null);
    const _isOpen = isControlled ? controlledIsOpen : isOpen;

    const referenceRef = useRef();
    const enterTimeoutRef: MutableRefObject<any> = useRef();
    const exitTimeoutRef: MutableRefObject<any> = useRef();

    const openWithDelay = () => {
        enterTimeoutRef.current = setTimeout(onOpen, showDelay);
    };

    const closeWithDelay = () => {
        exitTimeoutRef.current = setTimeout(onClose, hideDelay);
    };

    const tooltipId = `tooltip-${useId()}`;

    const handleOpen = () => {
        if (!isControlled) {
            openWithDelay();
        }

        if (onOpenProp) {
            onOpenProp();
        }
    };

    const handleClose = () => {
        if (!isControlled) {
            closeWithDelay();
        }

        if (onCloseProp) {
            onCloseProp();
        }
    };

    const tooltipStyleProps = useTooltipStyle({
        placement,
    });

    const handleClick = wrapEvent(children, 'onClick', () => {
        if (closeOnClick) {
            closeWithDelay();
        }
    });

    const referenceProps = {
        ref: referenceRef,
        onMouseEnter: wrapEvent(children, 'onMouseEnter', handleOpen),
        onMouseLeave: wrapEvent(children, 'onMouseLeave', handleClose),
        onClick: handleClick,
        onFocus: wrapEvent(children, 'onFocus', handleOpen),
        onBlur: wrapEvent(children, 'onBlur', handleClose),
        ...(_isOpen && { 'aria-describedby': tooltipId }),
    };

    let clone;

    if (typeof children === 'string' || shouldWrapChildren) {
        clone = (
            <Box as="span" tabIndex="0" {...referenceProps}>
                {children}
            </Box>
        );
    } else {
        clone = cloneElement(Children.only(children) as React.ReactElement, referenceProps);
    }

    const hasAriaLabel = ariaLabel != null;

    return (
        <React.Fragment>
            {clone}

            <Popper
                usePortal
                isOpen={_isOpen}
                modifiers={{ offset: { enabled: true, offset: `0, 8` } }}
                anchorEl={referenceRef.current}
                hasArrow={hasArrow}
                id={hasAriaLabel ? undefined : tooltipId}
                role={hasAriaLabel ? undefined : 'tooltip'}
                {...tooltipStyleProps}
                {...rest}
            >
                {label}
                {hasAriaLabel && (
                    <VisuallyHidden role="tooltip" id={tooltipId}>
                        {ariaLabel}
                    </VisuallyHidden>
                )}
                {hasArrow && <PopperArrow />}
            </Popper>
        </React.Fragment>
    );
};
