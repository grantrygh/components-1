/** @jsx jsx */
import { jsx } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import { useState } from 'react';
import { Form } from '.';
import { Button, Checkbox, CheckboxGroup, Heading, Input, Radio, RadioGroup, Select, Switch, Text } from '..';
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
    const [formValue, setFormValue] = useState({});
    return (
        <Box maxWidth="md" mx="auto" mt={9}>
            <Form
                onSubmit={(e, { getFormValue }) => {
                    e.preventDefault();
                    setFormValue(getFormValue());
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
                <RadioGroup>
                    <Radio value="male" name="bee">
                        Male
                    </Radio>
                    <Radio value="female" name="bee">
                        Female
                    </Radio>
                </RadioGroup>
                <Button type="submit">Submit</Button>
            </Form>
            {formValue && (
                <Box>
                    <Heading kind="h4" />
                    {Object.keys(formValue).map(key => (
                        <Text>
                            {key} : {formValue[key].toString()}
                        </Text>
                    ))}
                </Box>
            )}
        </Box>
    );
});
