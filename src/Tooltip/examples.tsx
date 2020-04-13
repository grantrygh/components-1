import { storiesOf } from '@storybook/react';
import PhoneIcon from 'mdi-react/PhoneIcon';
import React from 'react';
import { Tooltip } from '.';
import { Box } from '../Box';
import { Button } from '../Button';

const stories = storiesOf('Tooltip', module);
stories.addDecorator(story => {
    return (
        <Box maxWidth="lg" mx="auto" mt={6} p={6}>
            {story()}
        </Box>
    );
});

stories.add('Default', () => (
    <Tooltip label="Welcome home" placement="right" closeOnClick>
        <Button variant="primary" color="blue">
            Close
        </Button>
    </Tooltip>
));

stories.add('with a string', () => <Tooltip label="Welcome home">This is a sample</Tooltip>);

stories.add('with icon', () => (
    <Tooltip hasArrow shouldWrapChildren label="Welcome home" placement="right">
        <PhoneIcon />
    </Tooltip>
));
