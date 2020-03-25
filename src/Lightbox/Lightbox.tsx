/** @jsx jsx */
import { jsx } from '@emotion/core';
import Box from '../Box';
import { Modal, ModalCloseButton, ModalContent, ModalOverlay } from '../Modal';
import { useTheme } from '../ThemeProvider';
import { SlideIn } from '../Transition';
import { LightboxGalleryControls } from './components';
import { LightboxProps } from './types';

export const Lightbox = (props: LightboxProps) => {
    const { zIndices } = useTheme();
    const { isOpen, onClose, showControls, onKeyDown, children } = props;

    return (
        <Box>
            <SlideIn offset="10px" in={isOpen}>
                {/* @ts-ignore */}
                {styles => (
                    <Modal isOpen={isOpen} onClose={onClose} preserveScrollBarGap isCentered blockScrollOnMount>
                        {/* solid background ModalOverlay */}
                        <ModalOverlay opacity={1} backgroundColor="rgba(11,11,11,0.9)" />

                        {/* overlay wrapper for close & navigation button actions */}
                        <ModalOverlay bg="transparent" onKeyDown={onKeyDown}>
                            <ModalCloseButton zIndex={zIndices.modal + 1} color="white" />
                            {showControls && <LightboxGalleryControls />}
                            <ModalContent {...styles} shadow={0} bg="transparent" h="100%" my={0} pt="48px">
                                {children}
                            </ModalContent>
                        </ModalOverlay>
                    </Modal>
                )}
            </SlideIn>
        </Box>
    );
};
