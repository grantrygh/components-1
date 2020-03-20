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
    const { isOpen, onClose, showControls, children } = props;
    const bg = { light: 'white', dark: 'black' };

    return (
        <Box>
            <SlideIn offset="10px" in={isOpen}>
                {styles => (
                    <Modal isOpen={isOpen} onClose={onClose} preserveScrollBarGap isCentered blockScrollOnMount>
                        {/* solid background ModalOverlay */}
                        <ModalOverlay opacity={1} bg={bg[colorMode]} />

                        {/* overlay wrapper for close & navigation button actions */}
                        <ModalOverlay bg="transparent">
                            <ModalCloseButton zIndex={zIndices.modal + 1} />
                            {showControls && <LightboxGalleryControls />}
                            <ModalContent {...styles} shadow={0} bg="transparent" h="100%" my={0} py={4}>
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
