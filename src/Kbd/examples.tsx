import { storiesOf } from '@storybook/react';
import React from 'react';
import Kbd from '.';
import { Box } from '../Box';

const stories = storiesOf('Keyboard', module);

stories.add('Default', () => (
    <Box maxWidth="sm" mx="auto" mt={3}>
        <kbd>
            <Kbd>ctrl</Kbd>+<Kbd>D</Kbd>
        </kbd>
    </Box>
));
