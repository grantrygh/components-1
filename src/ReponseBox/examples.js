import { storiesOf } from '@storybook/react';
import React, { Fragment } from 'react';
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
    <Fragment>
        <ResponseBox
            onSubmit={message => {
                console.log(message);
            }}
        />
    </Fragment>
));
