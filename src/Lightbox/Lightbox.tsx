import React, { useEffect } from 'react';
import ReactLightbox from 'react-image-lightbox';
import { useGalleryContext } from './components';

// still uses context and self-adding images
// Switch to use lightbox library - no need to reinvent the wheel
export const Lightbox = () => {
    const context = useGalleryContext();
    const { activeItem, activeIndex, media, setActiveItem, onPrev, onNext } = context;

    useEffect(() => {
        if (activeItem && media?.length > 0) {
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = 'unset';
            };
        }
        return () => null;
    }, [activeItem, media?.length]);

    if (activeItem && media?.length > 0) {
        const current = media[activeIndex]?.src;
        const next = media[(activeIndex + 1) % media.length]?.src;
        const prev = media[(activeIndex + media.length - 1) % media.length]?.src;
        return (
            <ReactLightbox
                mainSrc={current}
                // mainSrcThumbnail={current}
                nextSrc={next}
                // nextSrcThumbnail={next}
                prevSrc={prev}
                // prevSrcThumbnail={prev}
                onCloseRequest={() => setActiveItem(null)}
                onMovePrevRequest={() => onPrev()}
                onMoveNextRequest={() => onNext()}
            />
        );
    }

    return null;
};
