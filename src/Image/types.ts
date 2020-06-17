import { BoxProps } from '../Box/types';

interface IImage {
    /**
     * The path to the image source
     */
    src?: string;
    srcSet?: string;
    /**
     * In event there was an error loading the `src`, specify a fallback
     * In most cases, this can be an avatar or image placeholder
     */
    fallbackSrc?: string;
    /**
     * The alt text that describes the image
     */
    alt?: string;
    /**
     * A callback for when the image `src` has been loaded
     */
    onLoad?: () => void;
    /**
     * A callback for when there was an error loading the image `src`
     */
    onError?: () => void;
    /**
     * The native HTML `width` attribute to the passed to the `img`
     */
    htmlWidth?: string | number;
    /**
     * The native HTML `height` attribute to the passed to the `img`
     */
    htmlHeight?: string | number;
    /**
     * Opt out of the `fallbackSrc` logic and use the `Image` directly
     */
    ignoreFallback?: boolean;
    /**
     * If true, image will be included in the lightbox, and serve as a trigger to open the lightbox.
     */
    withLightbox?: boolean;
}

export type ImageProps = IImage & BoxProps & Partial<HTMLImageElement>;
