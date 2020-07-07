import React from 'react';
import { Box } from '../Box';
import { Image } from '../Image';
import useVibrantShadowStyle from './styles';

export function VibrantShadow(props) {
    const { srcset, image, key, sizes, vibrancy = 1, opacity = 0.9, radius = 15, size = 0.98, offset = {} } = props;

    const { root: containerStyleProps, image: imageStyleProps, shadow: shadowStyleProps } = useVibrantShadowStyle({
        offset,
        opacity,
        size,
        radius,
        vibrancy,
    });

    if (!image) return null;

    return (
        <Box {...containerStyleProps}>
            <Image src={image} sizes={sizes} key={key} srcSet={srcset} alt="" {...imageStyleProps} />

            <Image alt="" src={image} key={key} sizes={sizes} srcSet={srcset} {...shadowStyleProps} />
        </Box>
    );
}
