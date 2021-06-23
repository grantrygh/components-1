import { storiesOf } from '@storybook/react';
import React from 'react';
import { Box } from '../Box';
import { AreaGraph, BarGraph } from './Graph';

const stories = storiesOf('Graph', module);
stories.addDecorator((story) => {
    return (
        <Box maxWidth="xl" mx="auto" mt={6} p={6}>
            {story()}
        </Box>
    );
});

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
    },
];

const items = [
    {
        key: 'uv',
        title: 'UV Label',
    },
    {
        key: 'pv',
        title: 'PV Label',
    },
];

stories.add('Area Graph', () => {
    return (
        <Box>
            <AreaGraph data={data} items={items} />
        </Box>
    );
});

stories.add('Basic Area Graph', () => {
    return (
        <Box>
            <AreaGraph basic data={data} items={[items[1]]} />
        </Box>
    );
});

stories.add('Bar Graph', () => {
    return (
        <Box>
            <BarGraph data={data} items={items} />
        </Box>
    );
});
