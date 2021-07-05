import { storiesOf } from '@storybook/react';
import React from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Text } from '../Text';
import { SiteTour } from './SiteTour';
import { RenderTourNavProps } from './types';

const stories = storiesOf('SiteTour', module);

stories.add('General', () => {
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
                <Button id="tour_search" variantColor="secondary">
                    Search
                </Button>
            </Flex>

            <SiteTour isDefaultOpen={true} tourSteps={tourSteps} />
        </Box>
    );
});

stories.add('Custom footer nav', () => {
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

    const renderCustomNav = ({ isFirst, isLast, currentStep, onPrev, onNext, onClose }: RenderTourNavProps) => {
        return (
            <Flex w="100%" justify="space-between" align="center">
                <Button isDisabled={isFirst} onClick={onPrev} variant="secondary">
                    Custom back
                </Button>
                <Text kind="small" state="faint" whiteSpace="nowrap">
                    Step {currentStep + 1}
                </Text>
                {isLast ? <Button onClick={onClose}>Done</Button> : <Button onClick={onNext}>Next</Button>}
            </Flex>
        );
    };

    return (
        <Box w="100%" h="100%">
            <Flex justify="space-between" w="100%">
                <Button id="tour_login">Login</Button>
                <Button id="tour_search" variantColor="secondary">
                    Search
                </Button>
            </Flex>

            <SiteTour isDefaultOpen={true} tourSteps={tourSteps} renderNav={renderCustomNav} />
        </Box>
    );
});
