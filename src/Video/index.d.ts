import * as React from 'react';
import { BoxProps } from '../Box';

export interface IVideo {
    src: string;
    id: string;

    cover?: string;
    autoplay?: boolean;
    allowSticky?: boolean;

    error?: Error;
    loading?: boolean;
}

export type VideoProps = IVideo & BoxProps;

declare const Video: React.FC<VideoProps>;

export default Video;
