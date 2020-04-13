import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import { Box } from '../Box';
import Text from '../Text';
import { Dropzone } from './Dropzone';

const stories = storiesOf('Dropzone', module);
stories.addDecorator(story => {
    return (
        <Box maxWidth="lg" mx="auto" mt={6} p={6}>
            {story()}
        </Box>
    );
});

stories.add('Default', () => {
    const [file, setFile] = useState(null);
    return (
        <Box>
            <Dropzone accept={['.pdf', 'image/*']} dropEvent={droppedFile => setFile(droppedFile)} />
            {file && (
                <Box>
                    <Text>Selected File</Text>
                    <Text>File Name: {file.name}</Text>
                    <Text>Last Modified: {file.lastModified}</Text>
                    <Text>Size: {file.size}</Text>
                </Box>
            )}
        </Box>
    );
});
