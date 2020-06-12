/** @jsx jsx */
import { jsx } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import { Box } from '../Box';
import { Card } from './Card';

const stories = storiesOf('Card', module);

stories.add('Cards', () => (
    <Box maxWidth="340px" mx="auto">
        <Card m="spacing">This is a normal card</Card>
        <Card raised m="spacing">
            This is a raised card
        </Card>
    </Box>
));
