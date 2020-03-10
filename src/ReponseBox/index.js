/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import Box from '../Box';
import Button from '../Button';
import Textarea from '../Textarea';

const ResponseBox = ({ onSubmit, onCancel }) => {
    const [message, setMessage] = useState('');
    const responseBoxStyle = {
        textTransform: 'uppercase',
        fontSize: 'xs',
    };

    const handleFormChange = e => {
        setMessage(e.target.value);
    };

    const handleFormSubmit = e => {
        e.preventDefault();
        onSubmit(message);
    };

    return (
        <Box w="100%" {...responseBoxStyle}>
            {/* <FormMessages messages={formMessages} /> */}
            {/* // TODO: add form once its a component */}
            <form onChange={handleFormChange} onSubmit={handleFormSubmit}>
                <Textarea
                    placeholder="Type and hit enter to send..."
                    variant="outline"
                    autoComplete="off"
                    block
                    size="md"
                    name="message"
                    focusBorderColor="cyan.500"
                    my="8px"
                />

                {onCancel && (
                    <Button onClick={onCancel} size="sm" mr="8px" variant="ghost" {...responseBoxStyle}>
                        Cancel
                    </Button>
                )}

                <Button type="submit" size="sm" bg="blue.500" color="white" {...responseBoxStyle}>
                    Send message
                </Button>
            </form>
        </Box>
    );
};

ResponseBox.displayName = 'ResponseBox';

export default ResponseBox;
