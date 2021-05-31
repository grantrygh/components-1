import { storiesOf } from '@storybook/react';
import React from 'react';
import { Select } from '.';
import { Box } from '../Box';
import { Button } from '../Button';
import { Form } from '../Form';
import { InputGroup } from '../InputGroup';
import { Stack } from '../Stack';

const stories = storiesOf('Select', module);

stories.addDecorator(story => {
    return (
        <Box maxWidth="lg" mx="auto" mt={6} p={6}>
            {story()}
        </Box>
    );
});

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

stories.add('Default', () => <Select placeholder="Select option" options={options} name="select" />);

stories.add('sizes', () => (
    <Box>
        <Stack>
            <InputGroup>
                {['sm', 'md', 'lg'].map(size => (
                    <Select key={size} size={size} placeholder="Placeholder" name="size" />
                ))}
            </InputGroup>
        </Stack>
    </Box>
));

stories.add('Variations', () => {
    return (
        <Box>
            <Form
                onSubmit={(e, { getFormValue }) => {
                    e.preventDefault();
                    console.log(getFormValue());
                }}
            >
                <Select
                    options={options}
                    name="flavor1"
                    placeholder="Single"
                    onChange={v => console.log('custom', v)}
                />
                <Select
                    options={options}
                    name="flavor2"
                    placeholder="Multi"
                    isMulti
                    onChange={v => console.log('custom', v)}
                />
                <Select
                    options={options}
                    name="flavor4"
                    placeholder="Disabled"
                    isDisabled
                    onChange={v => console.log('custom', v)}
                />
                <Select
                    options={options}
                    name="flavor5"
                    placeholder="Createable"
                    onChange={v => console.log('custom', v)}
                    onCreateOption={c => console.log('create', c)}
                />

                <Select
                    options={options}
                    name="flavor1"
                    placeholder="Full border"
                    onChange={v => console.log('custom', v)}
                    border="full"
                />

                <Select
                    options={options}
                    name="flavor1"
                    placeholder="Underlined"
                    onChange={v => console.log('custom', v)}
                    border="underline"
                />

                <Select
                    options={options}
                    name="flavor1"
                    placeholder="No border"
                    onChange={v => console.log('custom', v)}
                    border="unstyled"
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Box>
    );
});
