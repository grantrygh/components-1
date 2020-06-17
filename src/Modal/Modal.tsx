/* eslint-disable max-lines */
import { useId } from '@reach/auto-id';
import { hideOthers } from 'aria-hidden';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import exenv from 'exenv';
import React, { createContext, forwardRef, useCallback, useContext, useEffect, useRef } from 'react';
import FocusLock from 'react-focus-lock/dist/cjs';
import { Transition } from 'react-spring/renderprops';
import { Box } from '../Box';
import { BoxProps } from '../Box/types';
import { Card } from '../Card';
import { CloseButton } from '../CloseButton';
import { CloseButtonProps } from '../CloseButton/types';
import { Flex } from '../Flex';
import { useForkRef } from '../hooks/useForkRef';
import { Portal } from '../Portal';
import { getFocusables } from '../utils/getFocusables';
import { wrapEvent } from '../utils/wrapEvent';
import useModalStyle, { useModalWrapperStyle } from './styles';
import { AriaHiderProps, ModalContentProps, ModalContextProps, ModalProps } from './types';

const { canUseDOM } = exenv;
const ModalContext = createContext<ModalContextProps>({});
const useModalContext = () => useContext(ModalContext);

function useAriaHider({ isOpen, id, enableInert, container = canUseDOM ? document.body : null }: AriaHiderProps) {
    const mountRef = useRef(canUseDOM ? document.getElementById(id) || document.createElement('div') : null);

    useEffect(() => {
        let undoAriaHidden = null;
        const mountNode = mountRef.current;

        if (isOpen && canUseDOM) {
            mountRef.current.id = id;
            container.appendChild(mountRef.current);
            if (enableInert) {
                undoAriaHidden = hideOthers(mountNode);
            }
        }

        return () => {
            if (enableInert && undoAriaHidden != null) {
                undoAriaHidden();
            }
            if (mountNode.parentElement) {
                mountNode.parentElement.removeChild(mountNode);
            }
        };
    }, [isOpen, id, enableInert, container]);

    return mountRef;
}

const Modal = ({
    isOpen,
    initialFocusRef,
    finalFocusRef,
    onClose,
    blockScrollOnMount = true,
    closeOnEsc = true,
    closeOnOverlayClick = true,
    useInert = true,
    scrollBehavior = 'outside',
    isCentered = true,
    addAriaLabels = true,
    preserveScrollBarGap,
    formatIds = id => ({
        content: `modal-${id}`,
        header: `modal-${id}-header`,
        body: `modal-${id}-body`,
    }),
    container,
    returnFocusOnClose = true,
    children,
    id,
    size = 'md',
}: ModalProps) => {
    const contentRef = useRef(null);
    const uuid = useId();
    const _id = id || uuid;

    const contentId = formatIds(_id)['content'];
    const headerId = formatIds(_id)['header'];
    const bodyId = formatIds(_id)['body'];
    const portalId = `chakra-portal-${_id}`;

    let addAriaLabelledby = false;
    let addAriaDescribedby = false;

    if (typeof addAriaLabels === 'object') {
        addAriaLabelledby = addAriaLabels['header'];
        addAriaDescribedby = addAriaLabels['body'];
    }

    if (typeof addAriaLabels === 'boolean') {
        addAriaLabelledby = addAriaLabels;
        addAriaDescribedby = addAriaLabels;
    }

    useEffect(() => {
        const dialogNode = contentRef.current;
        if (isOpen && blockScrollOnMount) {
            disableBodyScroll(dialogNode, {
                reserveScrollBarGap: preserveScrollBarGap,
            });
        }
        return () => enableBodyScroll(dialogNode);
    }, [isOpen, blockScrollOnMount, preserveScrollBarGap]);

    useEffect(() => {
        const func = event => {
            if (event.key === 'Escape' && closeOnEsc) {
                onClose(event, 'pressedEscape');
            }
        };

        if (isOpen && !closeOnOverlayClick && canUseDOM) {
            document.addEventListener('keydown', func);
        }
        return () => {
            if (canUseDOM) {
                document.removeEventListener('keydown', func);
            }
        };
    }, [isOpen, onClose, closeOnOverlayClick, closeOnEsc]);

    const mountRef = useAriaHider({
        isOpen,
        id: portalId,
        enableInert: useInert,
        // @ts-ignore
        container,
    });

    const context = {
        isOpen,
        initialFocusRef,
        onClose,
        blockScrollOnMount,
        closeOnEsc,
        closeOnOverlayClick,
        returnFocusOnClose,
        contentRef,
        scrollBehavior,
        isCentered,
        headerId,
        bodyId,
        contentId,
        size,
        addAriaLabelledby,
        addAriaDescribedby,
    };

    const activateFocusLock = useCallback(() => {
        if (initialFocusRef && initialFocusRef.current) {
            initialFocusRef.current.focus();
        } else if (contentRef.current) {
            const focusables = getFocusables(contentRef.current);
            if (focusables.length === 0) {
                contentRef.current.focus();
            }
        }
    }, [initialFocusRef]);

    const deactivateFocusLock = useCallback(() => {
        if (finalFocusRef && finalFocusRef.current) {
            finalFocusRef.current.focus();
        }
    }, [finalFocusRef]);

    if (!isOpen) return null;

    return (
        <ModalContext.Provider value={context}>
            <Portal container={mountRef.current}>
                <FocusLock
                    returnFocus={returnFocusOnClose && !finalFocusRef}
                    onActivation={activateFocusLock}
                    onDeactivation={deactivateFocusLock}
                >
                    {children}
                </FocusLock>
            </Portal>
        </ModalContext.Provider>
    );
};

const ModalOverlay = React.forwardRef((props: BoxProps, ref) => {
    return (
        <Box
            pos="fixed"
            bg="overlay"
            left="0"
            top="0"
            w="100vw"
            h="100vh"
            ref={ref}
            zIndex="overlay"
            onClick={wrapEvent(props.onClick, event => {
                event.stopPropagation();
            })}
            {...props}
        />
    );
});

const ModalContent = React.forwardRef(({ onClick, children, zIndex, noStyles, ...props }: ModalContentProps, ref) => {
    const {
        contentRef,
        onClose,
        isCentered,
        bodyId,
        headerId,
        contentId,
        size,
        closeOnEsc,
        addAriaLabelledby,
        addAriaDescribedby,
        scrollBehavior,
        closeOnOverlayClick,
    } = useModalContext();
    const _contentRef = useForkRef(ref, contentRef);

    const modalWrapperStyleProps = useModalWrapperStyle({
        scrollBehavior,
        isCentered,
        noStyles,
    });

    const modalStyleProps = useModalStyle({
        scrollBehavior,
        isCentered,
        noStyles,
    });

    return (
        <Box
            pos="fixed"
            d="flex"
            // alignItems="center"
            left="0"
            top="0"
            w="100%"
            h="100%"
            zIndex={zIndex || 'modal'}
            onClick={event => {
                event.stopPropagation();
                if (closeOnOverlayClick) {
                    onClose(event, 'clickedOverlay');
                }
            }}
            onKeyDown={event => {
                if (event.key === 'Escape') {
                    event.stopPropagation();
                    if (closeOnEsc) {
                        onClose(event, 'pressedEscape');
                    }
                }
            }}
            {...modalWrapperStyleProps}
        >
            <Card
                d="flex"
                ref={_contentRef}
                as="section"
                role="dialog"
                aria-modal="true"
                tabIndex={-1}
                maxWidth={size}
                id={contentId}
                {...(addAriaDescribedby && { 'aria-describedby': bodyId })}
                {...(addAriaLabelledby && { 'aria-labelledby': headerId })}
                zIndex={zIndex || 'modal'}
                onClick={wrapEvent(onClick, event => event.stopPropagation())}
                {...modalStyleProps}
                {...props}
            >
                {children}
            </Card>
        </Box>
    );
});

const ModalHeader = forwardRef((props: BoxProps & { onClose?: () => void }, ref) => {
    const { headerId } = useModalContext();
    return (
        <Flex
            justify="space-between"
            align="center"
            ref={ref}
            px="spacing-lg"
            py="spacing"
            id={headerId}
            as="header"
            position="relative"
            {...props}
        />
    );
});

const ModalFooter = forwardRef((props: BoxProps, ref) => (
    <Flex justify="flex-end" ref={ref} px="spacing-lg" py="spacing" as="footer" {...props} />
));

const ModalBody = forwardRef((props: BoxProps, ref) => {
    const { bodyId, scrollBehavior } = useModalContext();

    let style = {};
    if (scrollBehavior === 'inside') {
        style = { overflowY: 'auto' };
    }

    return <Box ref={ref} id={bodyId} px="spacing-lg" py="spacing" flex="1" color="bodyText" {...style} {...props} />;
});

const ModalCloseButton = forwardRef((props: CloseButtonProps, ref) => {
    const { onClose } = useModalContext();
    return <CloseButton ref={ref} onClick={onClose} position="absolute" top="8px" right="12px" {...props} />;
});

const ModalTransition = ({ isOpen, duration = 150, children }) => (
    <Transition
        items={isOpen}
        from={{ opacity: 0, y: 10 }}
        enter={{ opacity: 1, y: 0 }}
        leave={{ opacity: 0, y: -10 }}
        config={{ duration }}
    >
        {isTransOpen => isTransOpen && (styles => children(styles))}
    </Transition>
);

export { Modal, ModalHeader, ModalTransition, ModalFooter, ModalBody, ModalCloseButton, ModalOverlay, ModalContent };
