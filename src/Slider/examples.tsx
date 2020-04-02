/** @jsx jsx */
import { jsx } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import Slider, { SliderFilledTrack, SliderThumb, SliderTrack } from '.';
import Box from '../Box';

const stories = storiesOf('Slider', module);

stories.addDecorator(story => {
    return (
        <Box maxWidth="lg" mx="auto" mt={6} p={6}>
            {story()}
        </Box>
    );
});

stories.add('Default', () => (
    <Slider>
        <SliderTrack />
        <SliderFilledTrack />
        <SliderThumb />
    </Slider>
));
