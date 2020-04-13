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
    Stack,
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
                initialValue={{
                    first_name: 'testname',
                    gender: 'male',
                    age: '4',
                    chocolate: true,
                    caramel: false,
                    flavor: 'mango',
                    lactose_intolerant: true,
                }}
            >
                <InputGroup label="First Name">
                    <Input name="first_name" />
                </InputGroup>

                <InputGroup label="Age">
                    <NumberInput max={35} min={0} step={1} name="age" />
                </InputGroup>

                <RadioGroup name="gender">
                    <Radio value="male" name="male">
                        Male
                    </Radio>
                    <Radio value="female" name="female">
                        Female
                    </Radio>
                </RadioGroup>
                <InputGroup label="Ice cream flavor">
                    <Select
                        name="flavor"
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
                <CheckboxGroup name="checkboxGroup">
                    <Checkbox name="chocolate">Chocolate</Checkbox>
                    <Checkbox name="caramel">Caramel</Checkbox>
                </CheckboxGroup>

                <Stack>
                    <Switch name="lactose_intolerant">I'm lactose intolerant</Switch>
                </Stack>

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
