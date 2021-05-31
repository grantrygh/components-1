import { storiesOf } from '@storybook/react';
import AlertIcon from 'mdi-react/AlertIcon';
import React from 'react';
import { FullTag } from '.';
import { Stack } from '../Stack';

const stories = storiesOf('FullTag', module);

stories.add('full tag', () => {
    return (
        <Stack align="center" isInline>
            <FullTag label="Not Rounded Subtle" subLabel="The sub title">
                <AlertIcon />
            </FullTag>

            <FullTag label="Rounded Subtle" subLabel="The sub title" rounded variantColor="orange">
                <AlertIcon />
            </FullTag>

            <FullTag label="Not Rounded Solid" subLabel="The sub title" variant="solid" variantColor="red">
                <AlertIcon />
            </FullTag>

            <FullTag label="Rounded Solid" subLabel="The sub title" rounded variant="solid" variantColor="blue">
                <AlertIcon />
            </FullTag>
        </Stack>
    );
});
