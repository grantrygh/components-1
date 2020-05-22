import * as React from 'react';

export interface ILightbox {
    /**
     *  If `true`, the lightbox will be displayed
     */
    isOpen?: boolean;
    /**
     * Event that gets fired when the lightbox overlay or close button are clicked.
     */
    onClose?: () => void;
    /**
     * (For Gallery) If 'true', show Prev and Next arrows for media navigation
     */
    showControls?: boolean;
    /**
     * Allows custom keydown events for lightbox. Gallery uses for arrow onPrev, onNext arrows
     */
    onKeyDown?: (event: React.KeyboardEvent) => void;

    children: any;
}

export interface ILightboxMedia {
    /**
     *  media item src
     */
    src: string;
    /**
     *  allow for a custom cover image to be used as the thumbnail
     */
    cover?: string;
    /**
     * sets the media type. 'image' will use <Image> and 'video' the <Video> component.
     */
    type: 'image' | 'video';

    children?: any;
}

export interface IGalleryProps {
    register: (media) => void;
    unregister: (media) => void;
    setActiveItem: (media) => void;
    onNext: () => void;
    onPrev: () => void;
    media: Array<{ src: string; cover?: string; type?: 'video' | 'image' }>;
    activeItem: {
        src: string;
        cover?: string;
        type?: 'video' | 'image';
    };
    activeIndex: number;
}

export type LightboxProps = ILightbox;
export type LightboxMediaProps = ILightboxMedia;
export type GalleryProps = IGalleryProps;
