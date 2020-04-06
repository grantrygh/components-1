import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import PlusIcon from 'mdi-react/PlusIcon';
import React from 'react';
import Button from '.';
import Box from '../Box';
import ButtonGroup from '../ButtonGroup';

const stories = storiesOf('Button', module);
stories.addDecorator(withKnobs);
stories.addDecorator(story => {
    return (
        <Box mx="auto" mt={6} p={6}>
            {story()}
        </Box>
    );
});

stories.add('variants', () => (
    <ButtonGroup>
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="tertiary">Tertiary Button</Button>
        <Button variant="tertiary" isDisabled>
            Disabled Button
        </Button>
    </ButtonGroup>
));

stories.add('sizes', () => (
    <ButtonGroup>
        <Button size="sm">Small Button</Button>
        <Button size="md">Medium Button</Button>
        <Button size="lg">Large Button</Button>
    </ButtonGroup>
));

stories.add('with icons', () => (
    <ButtonGroup>
        <Button leftIcon="phone">Call Us</Button>
        <Button size="sm" rightIcon="phone">
            Call Us
        </Button>
        <Button size="sm" leftIcon={PlusIcon} rightIcon={ChevronDownIcon}>
            MDI icon - Call Us
        </Button>
    </ButtonGroup>
));

stories.add('styles', () => (
    <ButtonGroup>
        <Button variantColor="success" onClick={() => console.log('success')}>
            Success Button
        </Button>
        <Button variantColor="error">Primary Error Button</Button>
        <Button variantColor="error" variant="secondary">
            Secondary Primary Error Button
        </Button>
        <Button variantColor="error" variant="tertiary">
            Tertiary Error Button
        </Button>
        <Button variantColor="purple">Colored Button</Button>
        <Button isLoading>Loading</Button>
        <Button isLoading loadingText="Loading">
            Loading
        </Button>
    </ButtonGroup>
));
