import { storiesOf } from '@storybook/react';
import React from 'react';
import Lorem from 'react-lorem-component';
import Video from '.';
import Box from '../Box';
import Text from '../Text';

const stories = storiesOf('Video', module);
stories.addDecorator(story => {
    return (
        <Box mx="auto" mt={12} p={12}>
            {story()}
        </Box>
    );
});

stories.add('Default', () => (
    <Box>
        <Text>.mp4 (200x100)</Text>
        <Video
            src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
            id={2}
            width={200}
            height={100}
            cover="http://placeimg.com/335/335"
        />
        <Text>.webm (300x200)</Text>
        <Video
            src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.webm"
            id={2}
            width={300}
            height={200}
            cover="http://placeimg.com/335/335"
        />
        <Text>.ogv (use default size)</Text>
        <Video src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.ogv" id={2} cover="http://placeimg.com/335/335" />
    </Box>
));

stories.add('Youtube', () => (
    <Box>
        <Video src="http://www.youtube.com/embed/NlOF03DUoWc" id={1} height={400} width={600} />
    </Box>
));

stories.add('sticky - small', () => (
    <Box>
        <Lorem count={2} />
        <Video src="http://www.youtube.com/embed/NlOF03DUoWc" id={2} cover="http://placeimg.com/335/335" allowSticky />
        <Lorem count={30} />
    </Box>
));

stories.add('sticky - large', () => (
    <Box>
        <Lorem count={2} />
        <Video
            src="http://www.youtube.com/embed/NlOF03DUoWc"
            id={2}
            cover="http://placeimg.com/335/335"
            height={600}
            width={800}
            allowSticky
        />
        <Lorem count={30} />
    </Box>
));
