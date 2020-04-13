import { storiesOf } from '@storybook/react';
import React from 'react';
import { Radio } from '.';
import { Box } from '../Box';
import RadioGroup from '../RadioGroup';

const stories = storiesOf('Radio', module);
stories.addDecorator(story => {
    return (
        <Box maxWidth="lg" mx="auto" mt={6} p={6}>
            {story()}
        </Box>
    );
});

stories.add('Default', () => (
    <RadioGroup>
        <Radio value="male" name="bee">
            Male
        </Radio>
        <Radio value="female" name="bee">
            Female
        </Radio>
    </RadioGroup>
));

stories.add('Inline Radio (large) ', () => (
    <RadioGroup isInline size="lg" defaultValue="male" onChange={(event, value) => console.log(value)}>
        <Radio value="male">Male</Radio>
        <Radio value="female">Female</Radio>
    </RadioGroup>
));

stories.add('Disabled', () => (
    <RadioGroup>
        <Radio value="male" name="bee" isDisabled>
            Male
        </Radio>
        <Radio value="female" name="bee">
            Female
        </Radio>
    </RadioGroup>
));
