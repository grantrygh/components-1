import { storiesOf } from '@storybook/react';
import React from 'react';
import { LightboxGalleryProvider, LightboxMedia } from '.';
import Box from '../Box';
import Image from '../Image';

const stories = storiesOf('Lightbox', module);

stories.add('Default', () => {
    const images = [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/200',
        'https://via.placeholder.com/250',
    ];

    return (
        <Box maxWidth="sm" mx="auto" mt={3}>
            <LightboxGalleryProvider>
                <Box>
                    <Box>Page content</Box>

                    {images.map(src => (
                        <LightboxMedia src={src} key={src}>
                            <Image src={src} htmlHeight="150px" />
                        </LightboxMedia>
                    ))}
                </Box>
            </LightboxGalleryProvider>
        </Box>
    );
});
