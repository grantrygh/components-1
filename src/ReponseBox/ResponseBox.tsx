/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import Box from '../Box';
import Button from '../Button';
import Textarea from '../Textarea';
import useResponseBoxStyle from './styles';
import { ResponseBoxProps } from './types';

export const ResponseBox = ({ onSubmit, onCancel = null, ...props }: ResponseBoxProps) => {
    const [message, setMessage] = useState('');
    const responseStyleProps = useResponseBoxStyle({
        color: props.color,
    });

    const handleFormChange = e => {
        setMessage(e.target.value);
    };

    const handleFormSubmit = e => {
        e.preventDefault();
        onSubmit(message);
    };

    return (
        <Box w="100%">
            {/* <FormMessages messages={formMessages} /> */}
            {/* // TODO: add form once its a component */}
            <form onChange={handleFormChange} onSubmit={handleFormSubmit}>
                <Textarea
                    placeholder="Type and hit enter to send..."
                    variant="outline"
                    autoComplete="off"
                    block
                    name="message"
                    {...responseStyleProps.text}
                />

                {onCancel && (
                    <Button onClick={onCancel} {...responseStyleProps.cancel}>
                        Cancel
                    </Button>
                )}

                <Button type="submit" {...responseStyleProps.submit}>
                    Send message
                </Button>
            </form>
        </Box>
    );
};
