/** @jsx jsx */
import { jsx } from '@emotion/core';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { Box } from '../Box';
import { LightboxMedia } from '../Lightbox';
import { ImageProps } from './types';

export const useHasImageLoaded = ({ src, onLoad, onError }) => {
    const isMounted = useRef(true);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        if (!src) {
            return;
        }
        const image = new window.Image();
        image.src = src;

        image.onload = event => {
            if (isMounted.current) {
                setHasLoaded(true);
                if (onLoad) {
                    onLoad(event);
                }
            }
        };

        image.onerror = event => {
            if (isMounted.current) {
                setHasLoaded(false);
                if (onError) {
                    onError(event);
                }
            }
        };
    }, [src, onLoad, onError]);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    return hasLoaded;
};

const NativeImage = forwardRef(({ width, height, alt, ...props }: HTMLImageElement, ref: any) => (
    // @ts-ignore
    <img width={width} height={height} ref={ref} alt={alt} {...props} />
));

export const Image = forwardRef(
    (
        {
            src,
            fallbackSrc,
            onError,
            onLoad,
            ignoreFallback,
            withLightbox,
            htmlHeight,
            htmlWidth,
            ...props
        }: ImageProps,
        ref
    ) => {
        const hasLoaded = useHasImageLoaded({ src, onLoad, onError });
        const baseProps = {
            height: htmlHeight,
            width: htmlWidth,
        };
        let imageProps;
        if (ignoreFallback) {
            imageProps = { src, onLoad, onError, ...baseProps };
        } else {
            imageProps = { src: hasLoaded ? src : fallbackSrc, ...baseProps };
        }

        if (withLightbox) {
            return (
                <LightboxMedia src={src || fallbackSrc} type="image" cover={src || fallbackSrc}>
                    <Box as={NativeImage} ref={ref} {...imageProps} {...props} />
                </LightboxMedia>
            );
        }

        return <Box as={NativeImage} ref={ref} {...imageProps} {...props} />;
    }
);
