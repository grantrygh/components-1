/** @jsx jsx */
import { jsx } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import { Form } from '.';
import { Button, Input, Select, Switch } from '..';
import Box from '../Box';

const stories = storiesOf('Form', module);

stories.add('Sample', () => (
    <Box maxWidth="md" mx="auto" mt={9}>
        Form example:
        <Form
            onSubmit={(e, { getFormValue }) => {
                e.preventDefault();
                console.log(getFormValue());
            }}
        >
            One: <Input name="one" />
            Two: <Input name="two" />
            <button type="submit">Submit</button>
        </Form>
    </Box>
));

stories.add('With Select', () => (
    <Box maxWidth="md" mx="auto" mt={9}>
        <Form
            onSubmit={(e, { getFormValue }) => {
                e.preventDefault();
                console.log(getFormValue());
            }}
        >
            Input: <Input name="input" />
            Select:
            <Select
                name="select"
                options={[
                    { value: 'chocolate', label: 'Chocolate' },
                    { value: 'strawberry', label: 'Strawberry' },
                    { value: 'vanilla', label: 'Vanilla' },
                ]}
            />
            <Switch
                size="lg"
                // isDisabled
                name="switch"
                // onChange={e => console.log(e.target.checked)}
                color="cyan"
            />
            <Button type="submit">Submit</Button>
        </Form>
    </Box>
));
