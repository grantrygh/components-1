import { storiesOf } from '@storybook/react';
import React from 'react';
import { Spinner } from '.';
import { ISpinner } from './types';

const stories = storiesOf('Spinner', module);
stories.add('Default', () => (
    <React.Fragment>
        {['xl', 'lg', 'md', 'sm', 'xs'].map((size: ISpinner['size']) => (
            <Spinner m={3} size={size} />
        ))}
    </React.Fragment>
));

stories.add('Color', () => (
    <>
        {['xl', 'lg', 'md', 'sm', 'xs'].map((size: ISpinner['size']) => (
            <Spinner m={3} color="red.500" size={size} />
        ))}
    </>
));
