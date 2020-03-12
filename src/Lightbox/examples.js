import { storiesOf } from '@storybook/react';
import React from 'react';
import { LightboxGalleryProvider, LightboxMedia } from '.';
import Box from '../Box';
import Flex from '../Flex';
import Image from '../Image';
import Tabs, { Tab, TabList, TabPanel, TabPanels } from '../Tabs';
import Text from '../Text';

const stories = storiesOf('Lightbox', module);

stories.add('Default', () => {
    const images = ['http://placeimg.com/200/200', 'http://placeimg.com/250/250', 'http://placeimg.com/225/225'];

    return (
        <Box maxWidth="sm" mx="auto" mt={3}>
            <LightboxGalleryProvider>
                <Box>
                    <Box>Page content</Box>

                    <Flex>
                        {images.map(src => (
                            <LightboxMedia src={src} key={src}>
                                <Image src={src} htmlHeight="150px" />
                            </LightboxMedia>
                        ))}
                    </Flex>
                </Box>
            </LightboxGalleryProvider>
        </Box>
    );
});

stories.add('With skip', () => {
    const images = ['http://placeimg.com/200/200', 'http://placeimg.com/250/250', 'http://placeimg.com/350/350'];

    const imagesSecond = ['http://placeimg.com/300/300', 'http://placeimg.com/350/350'];

    return (
        <Box maxWidth="sm" mx="auto" mt={3}>
            <LightboxGalleryProvider>
                <Text>Page 2 media items are skipped from showing in lightbox</Text>
                <Tabs size="md" color="pink" isFitted>
                    <TabList>
                        <Tab>Page 1</Tab>
                        <Tab>Page 2</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <Flex>
                                {images.map(src => (
                                    <LightboxMedia src={src} key={src}>
                                        <Image src={src} />
                                    </LightboxMedia>
                                ))}
                            </Flex>
                        </TabPanel>
                        <TabPanel>
                            <Flex>
                                {imagesSecond.map(src => (
                                    <LightboxMedia src={src} skip>
                                        <Image src={src} />
                                    </LightboxMedia>
                                ))}
                            </Flex>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </LightboxGalleryProvider>
        </Box>
    );
});

stories.add('Large image list', () => {
    const images = [
        'http://placeimg.com/200/200',
        'http://placeimg.com/250/250',
        'http://placeimg.com/225/225',
        'http://placeimg.com/235/235',
        'http://placeimg.com/245/245',
        'http://placeimg.com/255/255',
        'http://placeimg.com/265/265',
        'http://placeimg.com/275/275',
        'http://placeimg.com/285/285',
        'http://placeimg.com/295/295',
        'http://placeimg.com/305/305',
        'http://placeimg.com/315/315',
        'http://placeimg.com/325/325',
        'http://placeimg.com/335/335',
    ];

    return (
        <Box maxWidth="sm" mx="auto" mt={3}>
            <LightboxGalleryProvider>
                <Box>
                    <Box>Page content</Box>

                    <Flex wrap="wrap">
                        {images.map(src => (
                            <LightboxMedia src={src} key={src}>
                                <Image src={src} htmlHeight="150px" />
                            </LightboxMedia>
                        ))}
                    </Flex>
                </Box>
            </LightboxGalleryProvider>
        </Box>
    );
});
