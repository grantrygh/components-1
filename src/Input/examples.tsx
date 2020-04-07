import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { Input } from '.';
import Box from '../Box';

const stories = storiesOf('Input', module);

stories.addDecorator(story => {
    return (
        <Box maxWidth="lg" mx="auto" mt={6} p={6}>
            {story()}
        </Box>
    );
});

stories.add('Default', () => <Input placeholder="Sample placeholder" />);

stories.add('Readonly & Full Width', () => (
    <Input placeholder="Sample placeholder" variant="outline" size="md" isReadOnly isFullWidth />
));

stories.add('Disabled', () => <Input placeholder="Sample placeholder" variant="outline" size="md" isDisabled />);

stories.add('Invalid', () => <Input placeholder="Sample placeholder" variant="outline" size="md" isInvalid />);

stories.add('Sizes', () => (
    <>
        <Input placeholder="Sample placeholder" variant="outline" size="sm" />
        <Input placeholder="Sample placeholder" variant="outline" size="md" />
        <Input placeholder="Sample placeholder" variant="outline" size="lg" />
    </>
));

const variantStories = storiesOf('Input/Variants', module);
variantStories.addDecorator(withKnobs);
variantStories.addDecorator(story => {
    return (
        <Box maxWidth="lg" mx="auto" mt={6} p={6}>
            {story()}
        </Box>
    );
});

variantStories.add('Filled', () => <Input variant="filled" placeholder="Text goes here" />);

variantStories.add('Flushed', () => <Input variant="flushed" placeholder="Text goes here" />);

variantStories.add('Outline', () => <Input variant="outline" placeholder="Text goes here" />);

variantStories.add('Unstyled', () => <Input variant="unstyled" placeholder="Text goes here" />);
