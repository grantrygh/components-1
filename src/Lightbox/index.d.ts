import * as React from 'react';

export interface ILightbox {
    /**
     *  If `true`, the lightbox will be displayed
     */
    isOpen?: boolean;
    /**
     * Event that gets fired when the lightbox overlay or close button are clicked.
     */
    onClose?: boolean;
}

export interface ILightboxMedia {
    /**
     *  media item src
     */
    src: string;
}

export type LightboxProps = ILightbox;
export type LightboxMediaProps = ILightboxMedia;

declare const Lightbox: React.FC<LightboxProps>;
declare const LightboxMedia: React.FC<LightboxMediaProps>;
declare const LightboxGalleryProvider: React.FC;

export default Lightbox;

export { LightboxMedia, LightboxGalleryProvider };
