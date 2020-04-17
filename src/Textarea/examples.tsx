/** @jsx jsx */
import { jsx } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import { ExpandingTextarea, Textarea } from '.';

const stories = storiesOf('Textarea', module);

stories.add('Default', () => (
    <Textarea maxWidth="sm" mx="auto" mt={2} placeholder="Here is a sample placeholder" size="md" />
));

stories.add('Expanding', () => (
    <ExpandingTextarea maxWidth="sm" mx="auto" placeholder="Here is a sample placeholder" size="md" />
));
