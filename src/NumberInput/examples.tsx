import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '.';
import { Box } from '../Box';

const stories = storiesOf('NumberInput', module);

stories.add('version2', () => (
    <Box maxWidth="sm" mx="auto" mt={5}>
        <NumberInput
            size="sm"
            max={35}
            min={0}
            step={4}
            onChange={action('onChange')}
            // precision={2}
        />
    </Box>
));

const ContolledEx = () => {
    const [val, setVal] = useState(null);
    return (
        <NumberInput size="md" max={35} min={0} step={4} value={val} precision={2} onChange={setVal}>
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper>+</NumberIncrementStepper>
                <NumberDecrementStepper>-</NumberDecrementStepper>
            </NumberInputStepper>
        </NumberInput>
    );
};

stories.add('v2 controlled', () => (
    <Box maxWidth="sm" mx="auto" mt={5}>
        <ContolledEx />
    </Box>
));

stories.add('allow out of range', () => (
    <Box maxWidth="sm" mx="auto" mt={5}>
        <NumberInput defaultValue={15} max={10} clampValueOnBlur={false} keepWithinRange={false}>
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    </Box>
));
