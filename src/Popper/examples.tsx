import { storiesOf } from '@storybook/react';
import React from 'react';
import { Popper } from '.';
import { Button } from '../Button';

const stories = storiesOf('Popper', module);

const Example = () => {
    const [open, setOpen] = React.useState(false);
    const buttonRef = React.useRef();

    function handleClick() {
        setOpen(!open);
    }

    return (
        <>
            <Button size="sm" ref={buttonRef} onClick={handleClick}>
                Toggle Popper
            </Button>
            <Popper placement="right" isOpen={open} anchorEl={buttonRef.current} hasArrow>
                <p>The content of the Popper.</p>
            </Popper>
        </>
    );
};

stories.add('Default', () => <Example />);
