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
    const images = ['http://lorempixel.com/200/200', 'http://lorempixel.com/250/250', 'http://lorempixel.com/225/225'];

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
    const images = ['http://lorempixel.com/200/200', 'http://lorempixel.com/250/250', 'http://lorempixel.com/225/225'];

    const imagesSecond = ['http://lorempixel.com/300/300', 'http://lorempixel.com/350/350'];

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
