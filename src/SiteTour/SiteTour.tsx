import React, { forwardRef, RefObject, useEffect, useRef, useState } from 'react';
import { Button } from '../Button';
import { Clickable } from '../Clickable';
import { Flex } from '../Flex';
import { useDisclosure } from '../hooks/useDisclosure';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay } from '../Modal';
import { Popover, PopoverBody, PopoverContent, PopoverFooter } from '../Popover';
import { Text } from '../Text';
import useSiteTourStyle from './styles';
import { FooterNavProps, SiteTourProps } from './types';

const FooterNavContent = forwardRef(
    ({ isFirst, isLast, onPrev, onNext, onClose, allowSkip = true }: FooterNavProps, ref) => (
        <Flex w="100%" justify="space-between" align="center">
            <Button isDisabled={isFirst} onClick={onPrev} variant="secondary">
                Back
            </Button>
            {allowSkip && (
                <Clickable onClick={onClose} px="spacing">
                    <Text kind="small" state="faint" whiteSpace="nowrap">
                        Skip tutorial
                    </Text>
                </Clickable>
            )}
            {isLast ? (
                <Button ref={ref} onClick={onClose}>
                    Finish
                </Button>
            ) : (
                <Button ref={ref} onClick={onNext}>
                    Continue
                </Button>
            )}
        </Flex>
    )
);

export const SiteTour = ({
    tourSteps,
    isDefaultOpen = false,
    onClose: onCustomClose,
    renderNav,
    ...props
}: SiteTourProps) => {
    const { isOpen, onClose: onTourClose } = useDisclosure(isDefaultOpen);
    const [tourStep, setTourStep] = useState(0);
    const { contentStyles, bodyStyles, footerStyles, popoverStyles } = useSiteTourStyle({});

    const initRef = useRef();

    const onNext = () => {
        setTourStep((prev) => prev + 1);
    };

    const onPrev = () => setTourStep((prev) => prev - 1);

    const onClose = () => {
        onTourClose();

        if (onCustomClose && typeof onCustomClose === 'function') {
            onCustomClose();
        }
    };

    const isLast = tourStep === tourSteps?.length - 1;
    const isFirst = tourStep === 0;

    const currentStep = tourSteps[tourStep];
    const referenceRef: HTMLObjectElement =
        typeof window !== 'undefined' &&
        currentStep?.selectorId &&
        document.querySelector(`#${currentStep.selectorId}`);

    useEffect(() => {
        if (referenceRef && isOpen) {
            // set any previous styles being overridden while active
            const prevZIndex = referenceRef.style.zIndex;

            referenceRef.style.zIndex = '1500';

            return () => {
                // reset styles back to previous when not active
                referenceRef.style.zIndex = prevZIndex;
            };
        }
    }, [tourStep, isOpen]);

    const navProps = {
        isFirst,
        isLast,
        onNext,
        onPrev,
        onClose,
    };

    // if no reference ref is defined, render content as a centered modal
    if (!referenceRef) {
        return (
            <>
                {isOpen && <ModalOverlay onClick={onClose} key="overlay" />}
                <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="outside">
                    <ModalContent {...contentStyles}>
                        <ModalBody {...bodyStyles}>{currentStep?.content}</ModalBody>

                        <ModalFooter {...footerStyles}>
                            {renderNav && typeof renderNav === 'function' ? (
                                renderNav({
                                    ...navProps,
                                    currentStep: tourStep,
                                })
                            ) : (
                                <FooterNavContent {...navProps} {...props} />
                            )}
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        );
    }

    const popoverReferenceRef: RefObject<HTMLObjectElement> = {
        current: referenceRef,
    };

    return (
        <>
            {isOpen && <ModalOverlay onClick={onClose} key="overlay" />}
            <Popover
                initialReferenceRef={popoverReferenceRef}
                isOpen={isOpen}
                placement="auto-start"
                closeOnBlur={false}
                usePortal
                initialFocusRef={initRef}
            >
                <PopoverContent {...popoverStyles} {...contentStyles}>
                    <PopoverBody {...bodyStyles}>{currentStep?.content}</PopoverBody>

                    <PopoverFooter {...footerStyles}>
                        {renderNav && typeof renderNav === 'function' ? (
                            renderNav({
                                ...navProps,
                                currentStep: tourStep,
                            })
                        ) : (
                            <FooterNavContent ref={initRef} {...navProps} {...props} />
                        )}
                    </PopoverFooter>
                </PopoverContent>
            </Popover>
        </>
    );
};
