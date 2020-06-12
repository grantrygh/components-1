/* eslint-disable jsx-a11y/no-autofocus */
import { storiesOf } from '@storybook/react';
import React, { useRef, useState } from 'react';
import FocusLock from 'react-focus-lock/dist/cjs';
import {
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
} from '.';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Box } from '../Box';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { FormControl } from '../FormControl';
import { FormLabel } from '../FormLabel';
import { Input } from '../Input';
import { Link } from '../Link';
import { Stack } from '../Stack';
import { Text } from '../Text';

const stories = storiesOf('Popover', module);

const Example = () => {
    return (
        <Popover closeOnBlur={false}>
            <PopoverTrigger>
                <Button mt="180px">Trigger</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Confirmation!</PopoverHeader>
                <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

stories.add('Default', () => <Example />);

const PortalEx = () => {
    const initRef = useRef();
    return (
        <Popover closeOnBlur={false} placement="left" usePortal initialFocusRef={initRef}>
            <PopoverTrigger>
                <Button float="right">Trigger</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverHeader>Please Confirm!</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                    <Box>
                        Are you sure you want to delete something? This action is permanent, and we're totally not just
                        flipping a field called "deleted" to "true" in our database, we're actually deleting something.
                    </Box>
                    <Button mt="spacing" ref={initRef}>
                        Close
                    </Button>
                </PopoverBody>
                <PopoverFooter>This is the footer</PopoverFooter>
            </PopoverContent>
        </Popover>
    );
};

stories.add('with portal', () => <PortalEx />);

const PortalAndFocusLockEx = () => (
    <Popover usePortal closeOnBlur={false}>
        <PopoverTrigger>
            <Button float="right">Trigger</Button>
        </PopoverTrigger>
        <PopoverContent>
            <FocusLock returnFocus persistentFocus={false}>
                <PopoverHeader>Header</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                    <Button>Close</Button>
                </PopoverBody>
                <PopoverFooter>This is the footer</PopoverFooter>
            </FocusLock>
        </PopoverContent>
    </Popover>
);

stories.add('with focus lock', () => <PortalAndFocusLockEx />);

function Card() {
    return (
        <Box p={5}>
            <Avatar
                name="swyx"
                src="https://pbs.twimg.com/profile_images/990728399873232896/CMPn3IxT_reasonably_small.jpg"
            />
            <Text mt="spacing" fontWeight="bold">
                swyx
                <Badge ml="spacing-sm">Follows you</Badge>
            </Text>
            <Text mt="spacing-sm">Infinite Builder working on DX @Netlify. Helping people #LearnInPublic</Text>
        </Box>
    );
}

function TwitterEx() {
    return (
        <Popover trigger="hover">
            <PopoverTrigger>
                <Link href="/" color="blue.500">
                    Hover to see @swyx profile
                </Link>
            </PopoverTrigger>

            <PopoverContent bg="#15202b" color="white" width="400px">
                <Card />
            </PopoverContent>
        </Popover>
    );
}

stories.add('twitter hover card', () => <TwitterEx />);

const FeedbackEx = () => (
    <Popover usePortal defaultIsOpen closeOnBlur={false} placement="right">
        <PopoverTrigger>
            <Button>Trigger</Button>
        </PopoverTrigger>
        <PopoverContent border="0">
            <PopoverHeader borderBottom="0" bg="red.600" color="white">
                Header
                <PopoverCloseButton />
            </PopoverHeader>
            <PopoverBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore.
                <Link href="/" color="blue.500">
                    Learn More
                </Link>
            </PopoverBody>
        </PopoverContent>
    </Popover>
);

stories.add('feedback', () => <FeedbackEx />);

const WalkthroughEx = () => (
    <Popover placement="bottom" isOpen closeOnBlur={false}>
        <PopoverTrigger>
            <Button float="right">Trigger</Button>
        </PopoverTrigger>
        <PopoverContent color="white" bg="#032e61" borderColor="#032e61">
            <PopoverHeader pt={4} fontWeight="bold" border="0">
                Manage Your Channels
            </PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore.
            </PopoverBody>
            <PopoverFooter border="0" d="flex" alignItems="center" justifyContent="space-between" pb={4}>
                <Text>Step 2 of 4</Text>
                <ButtonGroup size="sm">
                    <Button variantColor="success">Setup Email</Button>
                    <Button>Next</Button>
                </ButtonGroup>
            </PopoverFooter>
        </PopoverContent>
    </Popover>
);

stories.add('walkthrough', () => <WalkthroughEx />);

const ConfirmationEx = () => (
    <Popover usePortal placement="right" closeOnBlur={false}>
        <PopoverTrigger>
            <Button>Delete Customer</Button>
        </PopoverTrigger>
        <PopoverContent>
            <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>Are you sure you want to continue with your action?</PopoverBody>
            <PopoverFooter d="flex" justifyContent="flex-end">
                <ButtonGroup size="sm">
                    <Button variant="tertiary">Cancel</Button>
                    <Button variantColor="error">Apply</Button>
                </ButtonGroup>
            </PopoverFooter>
        </PopoverContent>
    </Popover>
);

stories.add('confirmation', () => <ConfirmationEx />);

const CustomTargetEx = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button onClick={() => setOpen(!open)}>Trigger Popover</Button>
            <Popover returnFocusOnClose={false} isOpen={open} placement="right" closeOnBlur={false} usePortal>
                <PopoverTrigger>
                    <Button>Popover Target</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>Are you sure you want to continue with your action?</PopoverBody>
                    <PopoverFooter d="flex" justifyContent="flex-end">
                        <ButtonGroup size="sm">
                            <Button variant="tertiary">Cancel</Button>
                            <Button variantColor="error">Apply</Button>
                        </ButtonGroup>
                    </PopoverFooter>
                </PopoverContent>
            </Popover>
        </>
    );
};

stories.add('custom target', () => <CustomTargetEx />);

function Form({ initField, ...props }) {
    return (
        <Stack {...props}>
            <FormControl>
                <FormLabel htmlFor="fname">First name</FormLabel>
                <Input ref={initField} id="fname" defaultValue="John" />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="lname">Last name</FormLabel>
                <Input id="lname" defaultValue="Smith" />
            </FormControl>
        </Stack>
    );
}

const DialogForm = () => {
    const [open, setOpen] = useState(false);
    const firstField = useRef(null);
    return (
        <>
            <Box d="inline-block" mr={3}>
                John Smith
            </Box>
            <Popover
                isOpen={open}
                initialFocusRef={firstField}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                placement="right"
                closeOnBlur={false}
            >
                <PopoverTrigger>
                    <Button>Edit</Button>
                </PopoverTrigger>
                <PopoverContent p={5}>
                    <FocusLock returnFocus persistentFocus={false}>
                        <PopoverArrow bg="white" />
                        <PopoverCloseButton />
                        <Form initField={firstField} />
                        <ButtonGroup mt={5} d="flex" justifyContent="flex-end">
                            <Button variant="tertiary">Cancel</Button>
                            <Button isDisabled variantColor="teal">
                                Save
                            </Button>
                        </ButtonGroup>
                    </FocusLock>
                </PopoverContent>
            </Popover>
        </>
    );
};

stories.add('form with focus lock', () => <DialogForm />);
