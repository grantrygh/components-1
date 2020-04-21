/** @jsx jsx */
import { jsx } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import { Text } from '.';
import { Stack } from '../Stack';

const stories = storiesOf('Text', module);

stories.add('Default', () => {
    return (
        <Stack>
            <Text kind="small">Small text</Text>

            <Text kind="body">Body text</Text>

            <Text kind="large">Large text</Text>

            <Text state="faint">Faint body text</Text>
        </Stack>
    );
});
