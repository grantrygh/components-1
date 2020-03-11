/** @jsx jsx */
import { jsx } from '@emotion/core';
import { createContext, useContext, useEffect, useState } from 'react';
import Box from '../Box';
import { useColorMode } from '../ColorModeProvider';
import Flex from '../Flex';
import Image from '../Image';
import { Modal, ModalCloseButton, ModalContent, ModalOverlay } from '../Modal';
import { SlideIn } from '../Transition';

const GalleryContext = createContext();

// context provider hoc
const LightboxGalleryProvider = props => {
    const [activeItem, setActiveItem] = useState(null);
    const [mediaList, setMediaList] = useState([]);
    const media = [];

    const register = mediaItem => {
        media.push(mediaItem);
        setMediaList(media);
    };
    const unregister = mediaItem => {
        setMediaList(mediaList.filter(item => item !== mediaItem));
    };

    const context = { register, unregister, media: mediaList, activeItem, setActiveItem };

    return (
        <GalleryContext.Provider value={context}>
            {props.children}
            <LightboxGallery isOpen={!activeItem} />
        </GalleryContext.Provider>
    );
};

const useGalleryContext = () => {
    const context = useContext(GalleryContext);
    if (context === undefined) {
        throw new Error('useGalleryContext must be used within a LightboxGalleryProvider');
    }
    return context;
};

const LightboxMedia = ({ src, skip, children }) => {
    const context = useContext(GalleryContext);

    useEffect(() => {
        if (!skip) {
            // add image to lightbox context media array on mount
            context.register(src);

            // remove image from lightbox context media array on unmount
            return () => {
                context.unregister(src);
            };
        }
    }, [src]);

    // when the media item is clicked, set the context's active item to the media src
    return (
        <Box
            onClick={() => {
                if (!skip) {
                    context.setActiveItem(src);
                }
            }}
        >
            {children}
        </Box>
    );
};

// Lightbox with image gallery as content
const LightboxGallery = () => {
    const context = useGalleryContext();
    return (
        <Lightbox isOpen={!!context.activeItem} onClose={() => context.setActiveItem(null)}>
            {/* // TODO: this will be replaced by (carousel?) media navigation */}
            <Flex justify="center">
                {context.media.map(mediaItem => (
                    <Box>
                        <Image src={mediaItem} />
                    </Box>
                ))}
            </Flex>
        </Lightbox>
    );
};

const Lightbox = props => {
    const { colorMode } = useColorMode();
    const { isOpen, onClose, children } = props;
    const bg = { light: 'white', dark: 'black' };
    // const btnRef = useRef();
    const btnRef = null;

    return (
        <Box>
            <SlideIn offset="10px" in={isOpen}>
                {styles => (
                    <Modal
                        isOpen={isOpen}
                        onClose={onClose}
                        finalFocusRef={btnRef}
                        preserveScrollBarGap
                        isCentered
                        blockScrollOnMount
                    >
                        <ModalOverlay opacity={1} bg={bg[colorMode]}>
                            <ModalCloseButton />
                        </ModalOverlay>
                        <ModalContent {...styles} shadow={0} bg="transparent">
                            {children}
                        </ModalContent>
                    </Modal>
                )}
            </SlideIn>
        </Box>
    );
};

export default Lightbox;

export { LightboxMedia, LightboxGalleryProvider };
