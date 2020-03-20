/** @jsx jsx */
import { jsx } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import { Box } from '../Box';
import { Form, useFormField } from './';

const stories = storiesOf('Form', module);

const InputField = props => {
    const { onChange, value } = useFormField(props);

    return <input style={{ border: '1px solid red' }} name={props.name} onChange={onChange} value={value} />;
};

stories.add('Sample', () => (
    <Box maxWidth="md" mx="auto" mt={9}>
        Form example:
        <Form
            onSubmit={(e, { getFormValue }) => {
                e.preventDefault();
                console.log(getFormValue());
            }}
        >
            One: <InputField name="one" />
            Two: <InputField name="two" />
            <button type="submit">Submit</button>
        </Form>
    </Box>
));
