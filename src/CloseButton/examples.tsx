import { storiesOf } from '@storybook/react';
import React from 'react';
import { CloseButton } from '.';

const stories = storiesOf('CloseButton', module);
stories.add('Default', () => <CloseButton />);
