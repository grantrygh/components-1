import ChevronLeftIcon from 'mdi-react/ChevronLeftIcon';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Lightbox } from '.';
import { Box } from '../Box';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Grid } from '../Grid';
import { Image } from '../Image';
import { Link } from '../Link';
import { Scale } from '../Transition';
import { Video } from '../Video';
import useLightboxStyle from './styles';
import { GalleryProps, LightboxMediaProps } from './types';

/**
 *  useGalleryContext exposes the following props. can be used in cases such as adding off-screen images
 *  register(mediaItem): function to add new item to lightbox
 *  unregister(mediaItem): function to remove an item from the lightbox
 *  media[]: array of current items in the lightbox
 *  activeItem: current active lightbox item. lightbox will not display if there is no activeItem
 *  activeIndex: index of active item in array
 *  setActiveItem(mediaItem): set new activeItem
 *  onPrev: set active item to current index - 1
 *  onNext: set active item to current index + 1
 */

const GalleryContext = createContext<GalleryProps>({
    register: media => null,
    unregister: media => null,
    setActiveItem: media => null,
    onNext: () => null,
    onPrev: () => null,
    media: [],
    activeItem: {
        src: '',
        cover: '',
        type: 'image',
    },
    activeIndex: null,
});

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
            <LightboxGallery />
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

const LightboxMedia = ({ src, type, cover, children }: LightboxMediaProps) => {
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
    const mediaStyles = {
        video: {
            full: true,
            maxWidth: 'calc(100% - 16rem)',
            maxHeight: '100%',
        },
        image: {
            full: true,
            maxWidth: 'calc(100% - 16rem)',
            maxHeight: '100%',
        },
    };

    const generateThumbnails = () => {
        const list = [];
        const start = numItems > 4 ? 2 : 1;
        // show thumbnails 2 above and below current index
        for (let i = -start; i <= start; i++) {
            let itemIndex = activeIndex + i;
            if (itemIndex < 0) {
                itemIndex += numItems;
            } else if (itemIndex >= numItems) {
                itemIndex -= numItems;
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
                <Link onClick={() => setActiveItem(media[itemIndex])} w={90} h={90} {...(i === 0 ? activeStyle : {})}>
                    <Image src={thumbnail} h="full" w="full" />
                </Link>
            );
        }
        return list;
    };

    return (
        <Lightbox isOpen={!!activeItem} onClose={() => setActiveItem(null)} onKeyDown={onKeyDown} showControls>
            <Flex direction="column" h="100%">
                {/* gallery active image */}
                <Flex
                    flex={1}
                    align="center"
                    justify="center"
                    maxHeight="calc(100vh - 8rem - 48px)"
                    pos="relative"
                    onClick={() => setActiveItem(null)}
                >
                    {media.map(mi => (
                        <Scale
                            in={activeItem.src === mi.src}
                            initialScale={1}
                            position="absolute"
                            top={0}
                            right={0}
                            left={0}
                            bottom={0}
                            margin="auto"
                        >
                            {styles => {
                                return <MediaTag src={mi.src} {...mediaStyles[activeItem.type]} {...styles} />;
                            }}
                        </Scale>
                    ))}
                </Flex>

                {/* gallery thumbnails */}
                <Flex justify="center" align="center" height="8rem">
                    <Grid columns={[3, null, numItems >= 5 ? 5 : 3]} spacing="spacing-sm">
                        {generateThumbnails()}
                    </Grid>
                </Flex>
            </Flex>
        </Lightbox>
    );
};

const LightboxGalleryControls = () => {
    const { onPrev, onNext } = useGalleryContext();

    const { controlStyles } = useLightboxStyle({
        color: 'white',
    });

    return (
        <React.Fragment>
            <Button left={4} {...controlStyles} onClick={onPrev}>
                <ChevronLeftIcon size={36} />
            </Button>
            <Button right={4} {...controlStyles} onClick={onNext}>
                <ChevronRightIcon size={36} />
            </Button>
        </React.Fragment>
    );
};

export { LightboxGalleryProvider, LightboxGalleryControls, LightboxMedia, useGalleryContext };
