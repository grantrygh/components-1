import { storiesOf } from '@storybook/react';
import addDays from 'date-fns/addDays';
import addHours from 'date-fns/addHours';
import React from 'react';
import { Box } from '../Box';
import { CountdownTimer } from './CountdownTimer';

const stories = storiesOf('CountdownTimer', module);

stories.add('hours & minutes', () => (
    <Box>
        <CountdownTimer start_at={addHours(new Date(), 2)} />
    </Box>
));

stories.add('days', () => (
    <Box>
        <CountdownTimer start_at={addDays(new Date(), 2)} />
    </Box>
));
