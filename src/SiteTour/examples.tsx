import { storiesOf } from '@storybook/react';
import React from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { useDisclosure } from '../hooks/useDisclosure';
import { SiteTour } from './SiteTour';

const stories = storiesOf('SiteTour', module);

stories.add('General', () => {
    const { isOpen, onToggle, onClose } = useDisclosure();

    const tourSteps = [
        {
            selectorId: null,
            content: <Box>first step (no selectorId - modal)</Box>,
        },
        {
            selectorId: 'tour_login',
            content: <Box>second step (with selectorId - popover)</Box>,
        },
        {
            selectorId: 'tour_search',
            content: <Box>third step (no selectorId - modal)</Box>,
        },
    ];

    return (
        <Box w="100%" h="100%">
            <Flex justify="space-between" w="100%">
                <Button id="tour_login">Login</Button>
                <Button onClick={onToggle} variant="tertiary">
                    Start tour
                </Button>
                <Button id="tour_search" variantColor="secondary">
                    Search
                </Button>
            </Flex>

            {isOpen && <SiteTour isDefaultOpen={isOpen} tourSteps={tourSteps} />}
        </Box>
    );
});
