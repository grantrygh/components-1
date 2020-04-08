import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { Badge } from '.';
import Box from '../Box';
import Icon from '../Icon';

const stories = storiesOf('Badge', module);
stories.addDecorator(withKnobs);
stories.addDecorator(story => (
    <Box maxWidth="md" mt="40px" mx="auto">
        {story()}
    </Box>
));

stories.add('Default', () => {
    return <Badge color="green">Success</Badge>;
});

stories.add('Solid Badges', () => {
    return (
        <>
            {['gray', 'green', 'red', 'orange', 'purple', 'teal'].map(color => (
                <Badge variantColor={color} variant="solid" mr={2}>
                    {color}
                </Badge>
            ))}
        </>
    );
});

stories.add('Subtle Badges', () => {
    return (
        <>
            {['gray', 'green', 'red', 'orange', 'purple', 'teal'].map(color => (
                <Badge variantColor={color} mr={2}>
                    {color}
                </Badge>
            ))}
        </>
    );
});

stories.add('Outline Badges', () => {
    return (
        <>
            {['gray', 'green', 'red', 'orange', 'purple', 'teal'].map(color => (
                <Badge variantColor={color} variant="outline" mr={2}>
                    {color}
                </Badge>
            ))}
        </>
    );
});

stories.add('Hexagonal Badges', () => {
    return (
        <>
            {['gray', 'green', 'red', 'orange', 'purple', 'teal'].map((color, i) => (
                <Badge variantColor={color} variant="hexagon" mr={2} size={60}>
                    {i}
                </Badge>
            ))}
            <Badge variant="hexagon" mr={2} size={60}>
                <Icon name="repeat-clock" />
            </Badge>
        </>
    );
});
