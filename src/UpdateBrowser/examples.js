import { storiesOf } from '@storybook/react';
import React from 'react';
import Box from '../Box';
import Button from '../Button';
import UpdateBrowser from '../UpdateBrowser';

const stories = storiesOf('UpdateBrowser', module);
stories.addDecorator(story => {
    return (
        <Box maxWidth="lg" mx="auto" mt={6} p={6}>
            {story()}
        </Box>
    );
});

stories.add('Default', () => (
    <UpdateBrowser>
        <Button variant="solid" color="blue">
            Child
        </Button>
    </UpdateBrowser>
));
