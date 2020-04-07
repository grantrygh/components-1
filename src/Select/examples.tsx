/** @jsx jsx */
import { jsx } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import { useState } from 'react';
import Select from '.';
import Box from '../Box';
import { Button } from '../Button';
import { Form } from '../Form';
import Stack from '../Stack';
import { Text } from '../Text';

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
            {['sm', 'md', 'lg'].map(size => (
                <Select key={size} placeholder="Placeholder" name="size" />
            ))}
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
                <Button type="submit">Submit</Button>
            </Form>
        </Box>
    );
});

stories.add('In Form', () => {
    const [submittedValue, setSubmittedValue] = useState(null);
    return (
        <Box>
            Form example:
            <Form
                onSubmit={(e, { getFormValue }) => {
                    e.preventDefault();
                    const formValue = getFormValue();
                    if (formValue.flavor) {
                        setSubmittedValue(formValue.flavor);
                    }
                }}
            >
                <Select placeholder="Select option" options={options} name="flavor" />
                <Button type="submit">Submit</Button>
            </Form>
            {submittedValue && <Text>{submittedValue}</Text>}
        </Box>
    );
});
