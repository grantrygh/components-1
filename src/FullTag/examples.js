/** @jsx jsx */
import { jsx } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import FullTag from '.';
import Stack from '../Stack';

const stories = storiesOf('FullTag', module);

stories.add('full tag', () => {
    return (
        <Stack align="center" isInline>
            <FullTag label="Not rounded" subLabel="The sub title" />

            <FullTag label="Rounded" subLabel="The sub title" rounded variantColor="orange" />
        </Stack>
    );
});
