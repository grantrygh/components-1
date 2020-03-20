/** @jsx jsx */
import { jsx } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import { Box } from '../Box';
import Divider from '../Divider';
import Flex from '../Flex';

const stories = storiesOf('Divider', module);

stories.add('vertical', () => (
    <Flex align="stretch">
        <span>Part 1</span>
        <Divider orientation="vertical" />
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
