/** @jsx jsx */
import { jsx } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import { Heading } from '..';
import { Box } from './Box';

const stories = storiesOf('Box', module);
stories.add('Generic', () => {
    return (
        <Box bg="white" display={['flex', 'block']} rounded="lg" p={6} boxShadow="lg" transition="all 0.2s">
            <Box
                as="img"
                size={['24', '16']}
                rounded="full"
                mx={['0', 'auto']}
                mr={[5, null]}
                mb={[null, 4]}
                display="block"
                src="https://www.dropbox.com/s/nd8z3hxuo3ahauk/segun_adebayo.jpg?dl=1"
            />
            <Box textAlign={['left', 'center']}>
                <Heading kind="h4">Erin Lindford</Heading>
                <Box color="purple.500">Customer Support</Box>
                <Box color="gray.600">erinlindford@example.com</Box>
                <Box color="gray.600">(555) 765-4321</Box>
            </Box>
        </Box>
    );
});

stories.add('Responsive Styles', () => {
    return (
        <Box p={5} width={['full', 'full', '50%']} color="white" bg="green.500">
            Box
        </Box>
    );
});

stories.add('responsive test', () => <Box h="500px" bg="red.500" w={{ sm: '500px', md: '1000px' }} />);
