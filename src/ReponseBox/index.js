/** @jsx jsx */
import { jsx } from '@emotion/core';
import Box from '../Box';
import Button from '../Button';
import Textarea from '../Textarea';

const ResponseBox = ({ onChange, onSubmit, onCancel, ref, value, isFetching, errors, ...formProps }) => {
    const responseBoxStyle = {
        textTransform: 'uppercase',
        fontSize: 'xs',
    };

    return (
        <Box w="100%" {...responseBoxStyle}>
            {/* <FormMessages messages={formMessages} /> */}
            {/* // TODO: add form once its a component */}
            <form onChange={onChange} onSubmit={onSubmit} ref={ref} value={value} errors={errors} {...formProps}>
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
