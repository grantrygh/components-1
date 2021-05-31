import { storiesOf } from '@storybook/react';
import React from 'react';
import { ToggleButton, ToggleGroup } from '.';
import { Box } from '..';

const stories = storiesOf('ToggleButtonGroup', module);

stories.addDecorator(story => (
    <Box maxWidth="lg" mt="40px" mx="auto">
        {story()}
    </Box>
));

stories.add('Default', () => {
    return (
        <ToggleGroup defaultValue="rad1" onChange={val => console.log(val)} isInline>
            <ToggleButton value="rad1">Toggle 1</ToggleButton>
            <ToggleButton value="rad2">Toggle 2</ToggleButton>
            <ToggleButton value="rad3">Toggle 3</ToggleButton>
        </ToggleGroup>
    );
});
