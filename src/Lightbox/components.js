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
import Video from '../Video';

const GalleryContext = createContext();

// context provider hoc
const LightboxGalleryProvider = props => {
    const [activeItem, setActiveItem] = useState(null);
    const [mediaList, setMediaList] = useState([]);
    const media = [];
    const activeIndex = mediaList.findIndex(i => i.src === (activeItem && activeItem.src));
    const numMedia = mediaList.length;

    const register = mediaItem => {
        media.push(mediaItem);
        setMediaList(media);
    };
    const unregister = mediaItem => {
        setMediaList(mediaList.filter(item => item.src !== mediaItem.src));
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

const LightboxMedia = ({ src, type, cover, children }) => {
    const context = useGalleryContext();
    const media = {
        src,
        type,
        cover,
    };

    useEffect(() => {
        // add media item to lightbox context media array on mount
        context.register(media);

        // remove media item from lightbox context media array on unmount
        return () => {
            context.unregister(media);
        };
    }, []);

    // when the media item is clicked, set the context's active item
    return (
        <Box
            onClick={() => {
                context.setActiveItem(media);
            }}
            cursor="pointer"
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

    if (!activeItem) {
        return null;
    }

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

    const MediaTag = activeItem && activeItem.type === 'video' ? Video : Image;

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

            const thumb = media[itemIndex];
            // use passed cover as media thumbnail image
            let thumbnail = thumb.cover;

            // if the media item is a video and has no passed cover, check if YT thumb is available
            if (!thumbnail && thumb.type === 'video') {
                const re = new RegExp('(/|%3D|v=)([0-9A-z-_]{11})([%#?&]|$)');
                const ytId = thumb.src.match(re) && thumb.src.match(re)[2];
                thumbnail = ytId ? `https://img.youtube.com/vi/${ytId}/sddefault.jpg` : null;
            }

            list.push(
                <Box onClick={() => setActiveItem(media[itemIndex])} w={90} h={90} {...(i === 0 ? activeStyle : {})}>
                    <Image src={thumbnail} h="100%" />
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
                    <MediaTag src={activeItem.src} />
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
