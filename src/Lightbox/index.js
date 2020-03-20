/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Box } from '../Box';
import { useColorMode } from '../ColorModeProvider';
import { Modal, ModalCloseButton, ModalContent, ModalOverlay } from '../Modal';
import { useTheme } from '../ThemeProvider';
import { SlideIn } from '../Transition';
import { LightboxGalleryControls, LightboxGalleryProvider, LightboxMedia, useGalleryContext } from './components';

const Lightbox = props => {
    const { colorMode } = useColorMode();
    const { zIndices } = useTheme();
    const { isOpen, onClose, showControls, onKeyDown, children } = props;
    // const bg = { light: 'white', dark: 'black' };

    return (
        <Box>
            <SlideIn offset="10px" in={isOpen} maxWidth="100%">
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

export default Lightbox;

export { LightboxMedia, LightboxGalleryProvider, useGalleryContext };
