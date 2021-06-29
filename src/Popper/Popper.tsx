/**
 * Popper Component
 *
 * The following code is a derivative of the amazing work done by the Material UI team.
 * Original source: https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Popper/Popper.js
 */

import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import { Box } from '../Box';
import { useForkRef } from '../hooks/useForkRef';
import { Portal } from '../Portal';
import { PseudoBox } from '../PseudoBox';
import { appEnv } from '../utils/appEnv';
import { createChainedFunction } from '../utils/createChainedFunction';
import { setRef } from '../utils/setRef';
import usePopperStyle from './styles';
import { PopperArrowProps, PopperProps } from './types';
import PopperJS from './util';

/**
 * Flips placement if in <body dir="rtl" />
 * @param {string} placement
 */
function flipPlacement(placement) {
    const direction = (appEnv.isBrowser && document?.body.getAttribute('dir')) || 'ltr';

    if (direction !== 'rtl') {
        return placement;
    }

    switch (placement) {
        case 'bottom-end':
            return 'bottom-start';
        case 'bottom-start':
            return 'bottom-end';
        case 'top-end':
            return 'top-start';
        case 'top-start':
            return 'top-end';
        default:
            return placement;
    }
}

function getAnchorEl(anchorEl) {
    return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
}

const useEnhancedEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const Popper = forwardRef(
    (
        {
            anchorEl,
            children,
            container,
            usePortal = true,
            unmountOnExit = true,
            modifiers,
            isOpen,
            placement: initialPlacement = 'bottom',
            popperOptions = {},
            popperRef: popperRefProp,
            willUseTransition = false,
            arrowSize,
            arrowShadowColor,
            hasArrow,
            ...rest
        }: PopperProps,
        ref
    ) => {
        const tooltipRef = useRef(null);
        const ownRef = useForkRef(tooltipRef, ref);

        const popperRef = useRef(null);
        const handlePopperRef = useForkRef(popperRef, popperRefProp);
        const handlePopperRefRef = useRef(handlePopperRef);

        const popperStyleProps = usePopperStyle({
            arrowSize,
            arrowShadowColor,
            hasArrow,
        });

        useEnhancedEffect(() => {
            handlePopperRefRef.current = handlePopperRef;
        }, [handlePopperRef]);

        useImperativeHandle(popperRefProp, () => popperRef.current, []);

        const [exited, setExited] = useState(true);

        const rtlPlacement = flipPlacement(initialPlacement);

        const [placement, setPlacement] = useState(rtlPlacement);
        if (rtlPlacement !== placement) {
            setPlacement(rtlPlacement);
        }

        const handleOpen = useCallback(() => {
            const popperNode = tooltipRef.current;

            if (!popperNode || !anchorEl || !isOpen) {
                return;
            }

            if (popperRef.current) {
                popperRef.current.destroy();
                handlePopperRefRef.current(null);
            }

            const handlePopperUpdate = (data) => {
                setPlacement(data.placement);
            };
            const popper = new PopperJS(getAnchorEl(anchorEl), popperNode, {
                placement: rtlPlacement,
                ...popperOptions,
                modifiers: {
                    ...(usePortal && {
                        preventOverflow: {
                            boundariesElement: 'window',
                        },
                    }),
                    ...modifiers,
                    ...popperOptions.modifiers,
                },
                onUpdate: createChainedFunction(handlePopperUpdate, popperOptions.onUpdate),
            });
            handlePopperRefRef.current(popper);
        }, [anchorEl, usePortal, modifiers, isOpen, rtlPlacement, popperOptions]);

        const handleRef = useCallback(
            (node) => {
                setRef(ownRef, node);
                handleOpen();
            },
            [ownRef, handleOpen]
        );

        const handleEnter = () => {
            setExited(false);
        };

        const handleClose = () => {
            if (!popperRef.current) {
                return;
            }

            popperRef.current.destroy();
            handlePopperRefRef.current(null);
        };

        const handleExited = () => {
            setExited(true);
            handleClose();
        };

        useEffect(() => {
            handleOpen();
        }, [handleOpen]);

        useEffect(() => {
            return () => {
                handleClose();
            };
        }, []);

        useEffect(() => {
            if (!isOpen && !willUseTransition) {
                handleClose();
            }
        }, [isOpen, willUseTransition]);

        if (unmountOnExit && !isOpen && (!willUseTransition || exited)) {
            return null;
        }

        const childProps = {
            placement,
            transition: {},
        };

        if (willUseTransition) {
            childProps.transition = {
                in: isOpen,
                onEnter: handleEnter,
                onExited: handleExited,
            };
        }

        return (
            <Portal isDisabled={!usePortal} container={container}>
                <Box ref={tooltipRef}>
                    <PseudoBox ref={handleRef} pos="absolute" {...popperStyleProps} {...rest}>
                        {typeof children === 'function' ? children(childProps) : children}
                    </PseudoBox>
                </Box>
            </Portal>
        );
    }
);

export const PopperArrow = (props: PopperArrowProps) => <Box x-arrow="" role="presentation" bg="inherit" {...props} />;
