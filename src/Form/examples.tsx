/** @jsx jsx */
import { jsx } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import { useState } from 'react';
import { Form } from '.';
import {
    Button,
    Checkbox,
    CheckboxGroup,
    Heading,
    Input,
    InputGroup,
    Radio,
    RadioGroup,
    Select,
    Switch,
    Text,
} from '..';
import Box from '../Box';

const stories = storiesOf('Form', module);

stories.add('Sample', () => {
    const [formValue, setFormValue] = useState({});
    return (
        <Box maxWidth="md" mx="auto" mt={9}>
            <Form
                onSubmit={(e, { getFormValue }) => {
                    e.preventDefault();
                    setFormValue(getFormValue());
                }}
            >
                <InputGroup id="name" label="First Name">
                    <Input name="first_name" />
                </InputGroup>
                <RadioGroup name="gender">
                    <Radio value="male" name="male">
                        Male
                    </Radio>
                    <Radio value="female" name="female">
                        Female
                    </Radio>
                </RadioGroup>
                <InputGroup id="flavor" label="Ice cream flavor">
                    <Select
                        name="flavor"
                        options={[
                            { value: 'chocolate', label: 'Chocolate' },
                            { value: 'strawberry', label: 'Strawberry' },
                            { value: 'vanilla', label: 'Vanilla' },
                        ]}
                    />
                </InputGroup>
                <CheckboxGroup name="checkboxGroup">
                    <Checkbox name="chocolate">Chocolate</Checkbox>
                    <Checkbox name="caramel">Caramel</Checkbox>
                </CheckboxGroup>

                <CheckboxGroup>
                    <Switch size="lg" name="switch">
                        I'm lactose intolerant
                    </Switch>
                </CheckboxGroup>
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
