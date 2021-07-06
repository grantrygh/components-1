/* eslint-disable max-lines */

import { useId } from '@reach/auto-id';
import React, { Children, cloneElement, createContext, useContext, useEffect, useRef, useState } from 'react';
import { Box } from '../Box';
import { BoxProps } from '../Box/types';
import { CloseButton } from '../CloseButton';
import { usePrevious } from '../hooks/usePrevious';
import { Popper, PopperArrow } from '../Popper';
import { wrapEvent } from '../utils/wrapEvent';
import usePopoverStyle from './styles';
import {
    IPopoverContextValue,
    PopoverCloseButtonProps,
    PopoverContentProps,
    PopoverContextValueProps,
    PopoverProps,
    PopoverTriggerProps,
} from './types';

/**
 * Hook based idea:
 * const {referenceProps, popoverProps, arrowProps, state, actions} = usePopover(props).
 *
 * The popover must meet the AA Success Criterion
 * https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html
 * https://www.w3.org/WAI/WCAG21/Techniques/client-side-script/SCR39
 */

const PopoverContext = createContext<PopoverContextValueProps>({});

const usePopoverContext = () => {
    const context = useContext(PopoverContext);
    if (context == null) {
        throw Error('usePopoverContext must be used within <Popover/>');
    }
    return context;
};

const PopoverTrigger = ({ children }: PopoverTriggerProps) => {
    const {
        referenceRef,
        popoverId,
        onToggle,
        trigger,
        onOpen,
        isOpen,
        onClose,
        isHoveringRef: hoverRef,
    } = usePopoverContext();
    const isHoveringRef = { ...hoverRef };

    const child = Children.only(children);
    let eventHandlers = {};

    if (trigger === 'click') {
        eventHandlers = {
            onClick: wrapEvent(child.props.onClick, onToggle),
        };
    }

    if (trigger === 'hover') {
        eventHandlers = {
            onFocus: wrapEvent(child.props.onFocus, onOpen),
            onKeyDown: wrapEvent(child.props.onKeyDown, (event) => {
                if (event.key === 'Escape') {
                    setTimeout(onClose, 300);
                }
            }),
            onBlur: wrapEvent(child.props.onBlur, onClose),
            onMouseEnter: wrapEvent(child.props.onMouseEnter, () => {
                isHoveringRef.current = true;
                setTimeout(onOpen, 300);
            }),
            onMouseLeave: wrapEvent(child.props.onMouseLeave, () => {
                isHoveringRef.current = false;
                setTimeout(() => {
                    if (isHoveringRef.current === false) {
                        onClose();
                    }
                }, 300);
            }),
        };
    }

    return cloneElement(child, {
        'aria-haspopup': 'dialog',
        'aria-expanded': isOpen,
        'aria-controls': popoverId,
        ref: referenceRef,
        ...eventHandlers,
    });
};

const PopoverContent = ({
    onKeyDown,
    onBlur: onBlurProp,
    onMouseLeave,
    onMouseEnter,
    onFocus,
    'aria-label': ariaLabel,
    ...props
}: PopoverContentProps) => {
    const {
        popoverRef,
        referenceRef,
        placement,
        popoverId,
        isOpen,
        onBlur,
        closeOnEsc,
        onClose,
        isHoveringRef: hoverRef,
        trigger,
        headerId,
        bodyId,
        usePortal,
    } = usePopoverContext();
    const isHoveringRef = { ...hoverRef };

    const popoverContentStyleProps = usePopoverStyle({});

    let eventHandlers = {};
    let roleProps = {};

    if (trigger === 'click') {
        eventHandlers = {
            onBlur: wrapEvent(onBlurProp, onBlur),
        };

        roleProps = {
            role: 'dialog',
            'aria-modal': 'false',
        };
    }

    if (trigger === 'hover') {
        eventHandlers = {
            onMouseEnter: wrapEvent(onMouseEnter, () => {
                isHoveringRef.current = true;
            }),
            onMouseLeave: wrapEvent(onMouseLeave, () => {
                isHoveringRef.current = false;
                setTimeout(onClose, 300);
            }),
        };

        roleProps = {
            role: 'tooltip',
        };
    }

    eventHandlers = {
        ...eventHandlers,
        onKeyDown: wrapEvent(onKeyDown, (event) => {
            if (event.key === 'Escape' && closeOnEsc && onClose) {
                onClose();
            }
        }),
    };

    return (
        <Popper
            as="section"
            usePortal={usePortal}
            isOpen={isOpen}
            placement={placement}
            aria-label={ariaLabel}
            anchorEl={referenceRef.current}
            ref={popoverRef}
            id={popoverId}
            aria-hidden={!isOpen}
            position="relative"
            tabIndex={-1}
            aria-labelledby={headerId}
            aria-describedby={bodyId}
            {...roleProps}
            {...eventHandlers}
            {...popoverContentStyleProps}
            {...props}
        />
    );
};

const Popover = ({
    id,
    isOpen: isOpenProp,
    initialFocusRef,
    defaultIsOpen,
    usePortal = false,
    returnFocusOnClose = true,
    trigger = 'click' as IPopoverContextValue['trigger'],
    placement,
    children,
    closeOnBlur = true,
    closeOnEsc = true,
    onOpen: onOpenProp,
    onClose: onCloseProp,
    initialReferenceRef,
}: PopoverProps) => {
    const [isOpen, setIsOpen] = useState(defaultIsOpen || false);
    const { current: isControlled } = useRef(isOpenProp != null);

    const isHoveringRef = useRef() as IPopoverContextValue['isHoveringRef'];
    const referenceRefDefault = useRef() as IPopoverContextValue['referenceRef'];
    const referenceRef = initialReferenceRef || referenceRefDefault;
    const popoverRef = useRef() as IPopoverContextValue['popoverRef'];

    const _isOpen = isControlled ? isOpenProp : isOpen;

    const onToggle = () => {
        if (!isControlled) {
            setIsOpen(!_isOpen);
        }

        if (!_isOpen === true && onOpenProp) {
            onOpenProp();
        } else if (onCloseProp) {
            onCloseProp();
        }
    };

    const onOpen = () => {
        if (!isControlled) {
            setIsOpen(true);
        }

        if (onOpenProp) {
            onOpenProp();
        }
    };

    const onClose = () => {
        if (!isControlled) {
            setIsOpen(false);
        }

        if (onCloseProp) {
            onCloseProp();
        }
    };

    const handleBlur = (event) => {
        if (
            _isOpen &&
            closeOnBlur &&
            popoverRef.current &&
            referenceRef.current &&
            !popoverRef.current.contains(event.relatedTarget) &&
            !referenceRef.current.contains(event.relatedTarget)
        ) {
            onClose();
        }
    };

    // A unique fallback id in case the id prop wasn't passed
    const fallbackId = `popover-${useId()}`;
    const popoverId = id || fallbackId;

    const headerId = `${popoverId}-header`;
    const bodyId = `${popoverId}-body`;

    const prevIsOpen = usePrevious(_isOpen);

    useEffect(() => {
        if (_isOpen && trigger === 'click') {
            requestAnimationFrame(() => {
                if (initialFocusRef && initialFocusRef.current) {
                    initialFocusRef.current.focus();
                } else if (popoverRef && popoverRef.current) {
                    popoverRef.current.focus();
                }
            });
        }

        if (!_isOpen && prevIsOpen && trigger === 'click' && returnFocusOnClose && referenceRef.current) {
            referenceRef.current.focus();
        }
    }, [_isOpen, popoverRef, initialFocusRef, trigger, referenceRef, prevIsOpen, returnFocusOnClose]);

    const context = {
        popoverRef,
        placement,
        referenceRef,
        headerId,
        bodyId,
        popoverId,
        onOpen,
        onClose,
        onToggle,
        trigger,
        isOpen: _isOpen,
        onBlur: handleBlur,
        closeOnEsc,
        initialFocusRef,
        isHoveringRef,
        usePortal,
    };

    return (
        <PopoverContext.Provider value={context}>
            {typeof children === 'function' ? children({ isOpen: _isOpen, onClose }) : children}
        </PopoverContext.Provider>
    );
};

const PopoverHeader = (props: BoxProps) => {
    const { headerId } = usePopoverContext();
    return <Box as="header" id={headerId} px={3} py={2} borderBottomWidth="1px" {...props} />;
};

const PopoverFooter = (props: BoxProps) => <Box as="footer" px={3} py={2} borderTopWidth="1px" {...props} />;

const PopoverBody = (props: BoxProps) => {
    const { bodyId } = usePopoverContext();
    return <Box id={bodyId} flex="1" px={3} py={2} {...props} />;
};

const PopoverArrow = (props: BoxProps) => <PopperArrow {...props} />;

const PopoverCloseButton = ({ onClick, ...props }: PopoverCloseButtonProps) => {
    const { onClose } = usePopoverContext();

    return (
        <CloseButton
            size="sm"
            onClick={wrapEvent(onClick, onClose)}
            aria-label="Close"
            pos="absolute"
            rounded="md"
            top={1}
            right={2}
            p={2}
            {...props}
        />
    );
};

export {
    PopoverHeader,
    PopoverFooter,
    PopoverBody,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
};
