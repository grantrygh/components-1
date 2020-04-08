/** @jsx jsx */
import { jsx } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import { Form } from '.';
import { Button, Checkbox, CheckboxGroup, Input, Select, Switch } from '..';
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

stories.add('With All Input Types', () => {
    return (
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
                <CheckboxGroup name="checkboxGroup">
                    <Checkbox name="check1">Checkbox 1</Checkbox>
                    <Checkbox name="check2">Checkbox 2</Checkbox>
                    <Switch size="lg" name="switch" />
                </CheckboxGroup>
                <Button type="submit">Submit</Button>
            </Form>
        </Box>
    );
});
