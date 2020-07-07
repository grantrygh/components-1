import { storiesOf } from '@storybook/react';
import { Progress } from '.';
import { Box } from '../Box';
import { Stack } from '../Stack';

const stories = storiesOf('Progress', module).addDecorator(story => (
    <Box maxWidth="400px" mx="auto" mt={8} p={3}>
        {story()}
    </Box>
));

stories.add('basic usage', () => {
    return <Progress value={20} isIndeterminate />;
});

stories.add('with theme color ', () => {
    return <Progress color="pink.500" value={20} rounded="md" />;
});

stories.add('with stripe', () => {
    return <Progress color="green.500" hasStripe value={20} />;
});

stories.add('with sizes', () => {
    return (
        <Stack>
            <Progress color="green.500" size="sm" value={20} />
            <Progress color="green.500" size="md" value={20} />
            <Progress color="green.500" size="lg" value={20} />
        </Stack>
    );
});

stories.add('with stripe animation', () => {
    return <Progress color="green.500" hasStripe isAnimated value={20} />;
});
