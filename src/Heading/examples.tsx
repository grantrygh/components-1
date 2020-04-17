import { storiesOf } from '@storybook/react';
import React from 'react';
import { Heading } from '.';
import { HeadingProps } from './types';

const stories = storiesOf('Heading', module);

stories.add('Default', () => (
    <>
        {['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle'].map((kind: HeadingProps['kind'], index) => (
            <Heading kind={kind}>
                Heading {index + 1} ({kind})
            </Heading>
        ))}
    </>
));
