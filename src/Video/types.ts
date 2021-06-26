import { RefObject } from 'react';
import { BoxProps } from '../Box/types';

export interface IVideo {
    src: string;
    id: string | number;

    cover?: string;
    autoplay?: boolean;
    allowSticky?: boolean;

    // if true, video will be included in lightbox media item list
    withLightbox?: boolean;

    error?: Error;
    loading?: 'eager' | 'lazy';

    full?: boolean;
    height?: number;
    width?: number;
}

export type VideoProps = IVideo & Omit<BoxProps, 'height' | 'width'>;

interface IOuterContainer {
    iFrame?: boolean;
    innerRef?: RefObject<HTMLElement>;

    children?: React.ReactNode;
    src?: string;
}

export type OuterContainerProps = IOuterContainer & Omit<IVideo, 'src'>;
