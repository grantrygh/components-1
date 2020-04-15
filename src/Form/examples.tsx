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
    NumberInput,
    Radio,
    RadioGroup,
    Select,
    Switch,
    Text,
} from '..';
import { Box } from '../Box';

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
                onChange={p => console.log(p)}
                initialValue={{
                    first_name: 'testname',
                    gender: 'male',
                    age: 20,
                    chocolate: true,
                    caramel: false,
                    flavor: 'mango',
                    lactose_intolerant: true,
                }}
            >
                {/* <Input> should be wrapped by an <InputGroup> for form controls, label, and support for InputLeftElement, etc (see InputGroup) */}
                <InputGroup label="First Name" name="first_name">
                    <Input />
                </InputGroup>

                {/* Same as for <Input> */}
                <InputGroup label="Age" name="age">
                    <NumberInput max={100} min={0} step={1} />
                </InputGroup>

                {/* Since radio groups should have just one value selected, "name" is placed as a <RadioGroup> prop */}
                <RadioGroup label="Gender" name="gender">
                    <Radio value="male">Male</Radio>
                    <Radio value="female">Female</Radio>
                </RadioGroup>

                {/* <Select> should be wrapped in an <InputGroup> component to apply form controls and label */}
                <InputGroup label="Ice cream flavor" name="flavor">
                    <Select
                        isMulti
                        options={[
                            { value: 'chocolate', label: 'Chocolate' },
                            { value: 'vanilla', label: 'Vanilla' },
                            {
                                label: 'Fruits',
                                options: [
                                    {
                                        label: 'Strawberry',
                                        value: 'strawberry',
                                    },
                                    {
                                        label: 'Mango',
                                        value: 'mango',
                                    },
                                ],
                            },
                        ]}
                    />
                </InputGroup>

                {/* <CheckboxGroup> wrapped for form control and label. "name" should be passed to individual checkboxes, as multiple can be selected. */}
                <CheckboxGroup name="checkboxGroup" label="Toppings">
                    <Checkbox name="chocolate">Chocolate</Checkbox>
                    <Checkbox name="caramel">Caramel</Checkbox>
                </CheckboxGroup>

                {/* <Switch> components can just be wrapped in a <Stack> component which will apply consistent spacing as other InputGroups */}
                <InputGroup name="lactose_intolerant">
                    <Switch>I'm lactose intolerant</Switch>
                </InputGroup>

                <Button type="submit">Submit</Button>
            </Form>

            {formValue && (
                <Box>
                    <Heading kind="h4" />
                    {Object.keys(formValue).map(key => {
                        return (
                            <Text>
                                {key} : {formValue[key] && formValue[key].toString()}
                            </Text>
                        );
                    })}
                </Box>
            )}
        </Box>
    );
});
