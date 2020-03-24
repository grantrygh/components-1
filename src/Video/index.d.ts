import * as React from 'react';
import { BoxProps } from '../Box/types';

export interface IVideo {
    src: string;
    id: string;

    cover?: string;
    autoplay?: boolean;
    allowSticky?: boolean;

    // if true, video will be included in lightbox media item list
    withLightbox?: boolean;

    error?: Error;
    loading?: boolean;
}

export type VideoProps = IVideo & BoxProps;

declare const Video: React.FC<VideoProps>;

export default Video;
