import lightboxTheme from '!file-loader!react-image-lightbox/style.css'; /* eslint-disable-line import/no-webpack-loader-syntax, import/order  */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box } from '../Box';
import { LightboxGallery } from './Lightbox';
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
    register: (media) => null,
    unregister: (media) => null,
    setActiveItem: (media) => null,
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
const LightboxGalleryProvider = (props) => {
    const [activeItem, setActiveItem] = useState(null);
    const [mediaList, setMediaList] = useState([]);
    const media = [];
    const activeIndex = mediaList.findIndex((i) => i.src === (activeItem && activeItem.src));
    const numMedia = mediaList.length;

    const register = (mediaItem) => {
        media.push(mediaItem);
        setMediaList(media);
    };
    const unregister = (mediaItem) => {
        setMediaList(mediaList.filter((item) => item.src !== mediaItem.src));
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

    const context = {
        register,
        unregister,
        media: mediaList,
        activeItem,
        activeIndex,
        setActiveItem,
        onPrev,
        onNext,
        showThumbnails: props.showThumbnails,
    };

    const LightboxTheme = String(lightboxTheme);

    return (
        <GalleryContext.Provider value={context}>
            {props.children}
            <LightboxGallery />
            <Helmet>
                <link rel="stylesheet" type="text/css" href={LightboxTheme} />
            </Helmet>
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

const LightboxMedia = ({ src, type, cover, children, ...rest }: LightboxMediaProps) => {
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
            {...rest}
        >
            {children}
        </Box>
    );
};

export { LightboxGalleryProvider, LightboxMedia, useGalleryContext };
