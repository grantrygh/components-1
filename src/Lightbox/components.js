/** @jsx jsx */
import { jsx } from '@emotion/core';
import { createContext, Fragment, useContext, useEffect, useState } from 'react';
import Lightbox from '.';
import Box from '../Box';
import Button from '../Button';
import Flex from '../Flex';
import Icon from '../Icon';
import Image from '../Image';
import SimpleGrid from '../SimpleGrid';
import { useTheme } from '../ThemeProvider';

const GalleryContext = createContext();

// context provider hoc
const LightboxGalleryProvider = props => {
    const [activeItem, setActiveItem] = useState(null);
    const [mediaList, setMediaList] = useState([]);
    const media = [];
    const activeIndex = mediaList.indexOf(activeItem);
    const numMedia = mediaList.length;

    const register = mediaItem => {
        media.push(mediaItem);
        setMediaList(media);
    };
    const unregister = mediaItem => {
        setMediaList(mediaList.filter(item => item !== mediaItem));
    };

    const onNext = () => {
        if (activeIndex === numMedia - 1) {
            setActiveItem(mediaList[0]);
        } else {
            setActiveItem(mediaList[activeIndex + 1]);
        }
    };

    const onPrev = () => {
        if (activeIndex === 0) {
            setActiveItem(mediaList[numMedia - 1]);
        } else {
            setActiveItem(mediaList[activeIndex - 1]);
        }
    };

    const context = { register, unregister, media: mediaList, activeItem, activeIndex, setActiveItem, onPrev, onNext };

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
    const context = useGalleryContext();

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
            cursor={!skip && 'pointer'}
        >
            {children}
        </Box>
    );
};

// Lightbox with image gallery as content
const LightboxGallery = () => {
    const context = useGalleryContext();
    const { activeItem, activeIndex, media, setActiveItem, onPrev, onNext } = context;
    const numItems = media.length;

    const activeStyle = {
        outline: '1px solid rgba(0,0,0,0.8)',
        opacity: 0.5,
    };

    const onKeyDown = event => {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            onPrev();
        }

        if (event.key === 'ArrowRight') {
            event.preventDefault();
            onNext();
        }
    };

    const generateThumbnails = () => {
        const list = [];
        const start = numItems > 4 ? 2 : 1;
        // show thumbnails 2 above and below current index
        for (let i = -start; i <= start; i++) {
            let itemIndex = activeIndex + i;
            if (itemIndex < 0) {
                itemIndex = numItems + itemIndex;
            } else if (itemIndex >= numItems) {
                itemIndex = itemIndex - numItems;
            }
            list.push(
                <Box onClick={() => setActiveItem(media[itemIndex])} w={90} h={90} {...(i === 0 ? activeStyle : {})}>
                    <Image src={media[itemIndex]} />
                </Box>
            );
        }
        return list;
    };

    return (
        <Lightbox isOpen={!!activeItem} onClose={() => setActiveItem(null)} onKeyDown={onKeyDown} showControls>
            <Flex direction="column" h="100%">
                {/* gallery active image */}
                <Flex flex={1} align="center" justify="center">
                    <Image src={activeItem} />
                </Flex>

                {/* gallery thumbnails */}
                <Flex justify="center">
                    <SimpleGrid columns={[3, null, Math.min(5, numItems)]} spacing="10px">
                        {generateThumbnails()}
                    </SimpleGrid>
                </Flex>
            </Flex>
        </Lightbox>
    );
};

const LightboxGalleryControls = () => {
    const theme = useTheme();
    const { onPrev, onNext } = useGalleryContext();

    const buttonStyles = {
        position: 'absolute',
        top: 0,
        bottom: 0,
        margin: 'auto',
        zIndex: theme.zIndices.modal + 1,
        size: 'lg',
        variant: 'outline',
    };

    return (
        <Fragment>
            <Button left={4} {...buttonStyles} onClick={onPrev}>
                <Icon name="chevron-left" size={36} />
            </Button>
            <Button right={4} {...buttonStyles} onClick={onNext}>
                <Icon name="chevron-right" size={36} />
            </Button>
        </Fragment>
    );
};

export { LightboxGalleryProvider, LightboxGalleryControls, LightboxMedia, useGalleryContext };
