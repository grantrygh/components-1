import { storiesOf } from '@storybook/react';
import React from 'react';
import { Image } from '.';

const stories = storiesOf('Image', module);

stories.add('Default', () => <Image htmlWidth="100px" src="https://avatars3.githubusercontent.com/u/37928?s=52&v=4" />);
