import React from 'react';
import ReactLightbox from 'react-image-lightbox';
import { useGalleryContext } from './components';

// still uses context and self-adding images
// Switch to use lightbox library - no need to reinvent the wheel
export const LightboxGallery = () => {
    const context = useGalleryContext();
    const { activeItem, activeIndex, media, setActiveItem, onPrev, onNext } = context;

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
