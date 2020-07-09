import { storiesOf } from '@storybook/react';
import React from 'react';
import { Grid } from '.';
import { Box } from '../Box';
import { FullGrid } from '../FullGrid';

const stories = storiesOf('Grid', module);

stories.add('with columns', () => (
    <Grid columns={[2, null, 3]} spacing="spacing">
        <Box bg="tomato" height="200px" />
        <Box bg="tomato" height="200px" />
        <Box bg="tomato" height="200px" />
        <Box bg="tomato" height="200px" />
        <Box bg="tomato" height="200px" />
    </Grid>
));

stories.add('with autofit and min child width', () => (
    <Grid minChildWidth="300px" spacing="spacing-xs">
        <Box bg="tomato" height="200px" />
        <Box bg="tomato" height="200px" />
        <Box bg="tomato" height="200px" />
        <Box bg="tomato" height="200px" />
        <Box bg="tomato" height="200px" />
    </Grid>
));

stories.add('responsive columns', () => (
    <FullGrid templateColumns={{ base: '1fr', sm: '1fr 1fr 1fr' }} columnGap="40px">
        <Box bg="tomato" height="200px" />
        <Box bg="tomato" height="200px" />
        <Box bg="tomato" height="200px" />
    </FullGrid>
));

stories.add('responsive columns 2', () => (
    <FullGrid templateColumns={['1fr', '1fr 1fr 1fr']} columnGap="40px">
        <Box bg="tomato" height="200px" />
        <Box bg="tomato" height="200px" />
        <Box bg="tomato" height="200px" />
    </FullGrid>
));
