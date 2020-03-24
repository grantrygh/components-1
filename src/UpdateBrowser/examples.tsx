import { storiesOf } from '@storybook/react';
import React from 'react';
import { UpdateBrowser } from '.';
import Box from '../Box';
import Button from '../Button';

const stories = storiesOf('UpdateBrowser', module);
stories.addDecorator(story => {
    return (
        <Box maxWidth="lg" mx="auto" mt={6} p={6}>
            {story()}
        </Box>
    );
});

stories.add('Default', () => (
    <UpdateBrowser href="#">
        <Button variant="solid" color="blue">
            Child
        </Button>
    </UpdateBrowser>
));
