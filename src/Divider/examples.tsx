import { storiesOf } from '@storybook/react';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Divider } from './Divider';

const stories = storiesOf('Divider', module);

stories.add('vertical', () => (
    <Flex align="stretch">
        <span>Part 1</span>
        <Divider orientation="vertical" borderColor="red.500" />
        <span>Part 2</span>
    </Flex>
));

stories.add('horizontal', () => (
    <Box>
        <Box>Part 1</Box>
        <Divider />
        <Box>Part 2</Box>
        <Divider />
    </Box>
));
