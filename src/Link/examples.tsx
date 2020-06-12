import { storiesOf } from '@storybook/react';
import React from 'react';
import { Link } from './Link';

const stories = storiesOf('Link', module);

stories.add('Default', () => (
    <div>
        <Link variant="nice-border" href="/">
            Home
        </Link>
        <br />
        <Link variant="nice-bg" href="/">
            Docs
        </Link>
        <br />
        <Link href="/">Reference</Link>
    </div>
));
