import { storiesOf } from '@storybook/react';
import React from 'react';
import ResponseBox from '.';
import Box from '../Box';

const stories = storiesOf('ResponseBox', module);
stories.addDecorator(story => {
    return (
        <Box maxWidth="lg" mx="auto" mt={6} p={6}>
            {story()}
        </Box>
    );
});

stories.add('Default', () => (
    <>
        <ResponseBox
            onSubmit={message => {
                console.log(message);
            }}
        />
    </>
));
