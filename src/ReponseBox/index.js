/** @jsx jsx */
import { jsx } from '@emotion/core';
import Box from '../Box';
import Button from '../Button';
import Textarea from '../Textarea';

const ResponseBox = ({ onChange, onSubmit, onCancel, ref, value, isFetching, errors, ...formProps }) => {
    return (
        <Box w="100%">
            {/* <FormMessages messages={formMessages} /> */}
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
                    <Button onClick={onCancel} size="sm" mr="8px" variant="ghost">
                        Cancel
                    </Button>
                )}

                <Button type="submit" size="sm">
                    Send message
                </Button>
            </form>
        </Box>
    );
};

ResponseBox.displayName = 'ResponseBox';

export default ResponseBox;
