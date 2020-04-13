import { storiesOf } from '@storybook/react';
import React from 'react';
import { Heading } from '.';
import { HeadingProps } from './types';

const stories = storiesOf('Heading', module);

stories.add('Default', () => (
    <>
        {['2xl', 'xl', 'lg', 'md', 'sm', 'xs'].map((size: HeadingProps['size'], index) => (
            <Heading size={size}>Heading {index + 1}</Heading>
        ))}
    </>
));
