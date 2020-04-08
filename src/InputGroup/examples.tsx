/** @jsx jsx */
import { jsx } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import CheckIcon from 'mdi-react/CheckIcon';
import PhoneIcon from 'mdi-react/PhoneIcon';
import { useState } from 'react';
import InputGroup from '.';
import Box from '../Box';
import Button from '../Button';
import Input from '../Input';
import { InputLeftAddon, InputRightAddon } from '../InputAddon';
import { InputLeftElement, InputRightElement } from '../InputElement';

const stories = storiesOf('Input Group', module).addDecorator(story => {
    return (
        <Box maxWidth="sm" mx="auto" mt={5}>
            {story()}
        </Box>
    );
});

const size = 'md';

stories.add('with addons', () => (
    <Box>
        <InputGroup size={size}>
            <InputLeftAddon>+234</InputLeftAddon>
            <Input roundedLeft="0" placeholder="Welcome" />
        </InputGroup>
        <InputGroup size={size}>
            <InputRightAddon>.com</InputRightAddon>
            <Input roundedRight="0" placeholder="Welcome" />
        </InputGroup>
        <InputGroup size={size}>
            <InputLeftAddon>https://</InputLeftAddon>
            <Input rounded="0" placeholder="mysite" />
            <InputRightAddon>.com</InputRightAddon>
        </InputGroup>
    </Box>
));

stories.add('with icons', () => (
    <Box>
        <InputGroup size={size}>
            <InputLeftElement>
                <PhoneIcon />
            </InputLeftElement>
            <Input placeholder="Welcome" />
        </InputGroup>
        <InputGroup size={size}>
            <InputRightElement>
                <CheckIcon />
            </InputRightElement>
            <Input placeholder="Welcome" />
        </InputGroup>
        <InputGroup>
            <InputLeftElement>
                <PhoneIcon />
            </InputLeftElement>
            <InputRightElement>
                <CheckIcon />
            </InputRightElement>
            <Input placeholder="Welcome" />
        </InputGroup>
    </Box>
));

const PasswordInput = () => {
    const [show, setShow] = useState(false);
    return (
        <InputGroup size="md">
            <Input pr="72px" type={show ? 'text' : 'password'} placeholder="Enter password" />
            <InputRightElement width="72px">
                <Button size="sm" variant="unstyled" onClick={() => setShow(!show)}>
                    {show ? 'HIDE' : 'SHOW'}
                </Button>
            </InputRightElement>
        </InputGroup>
    );
};

stories.add('password input', () => <PasswordInput />);
