/** @jsx jsx */
import { jsx } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import React, { useRef, useState } from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
} from '.';
import { Button } from '../Button';

const stories = storiesOf('AlertDialog', module);

const SampleDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    const cancelRef = useRef();

    return (
        <React.Fragment>
            <Button onClick={onOpen}>Delete something</Button>
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader>Please Confirm!</AlertDialogHeader>
                    <AlertDialogBody>
                        Are you sure you want to delete something? This action is permanent, and we're totally not just
                        flipping a field called "deleted" to "true" in our database, we're actually deleting something.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Nevermind
                        </Button>
                        <Button variantColor="error" ml={3}>
                            Yes, delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </React.Fragment>
    );
};

stories.add('default', () => <SampleDialog />);

const SampleDialog2 = () => {
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    const cancelRef = useRef();

    return (
        <>
            <Button onClick={onOpen}>Delete something</Button>
            <AlertDialog addAriaLabels={false} isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay />
                <AlertDialogContent aria-labelledby="sample-header" aria-describedby="sample-body" id="sample">
                    <AlertDialogHeader id="sample-header">Please Confirm!</AlertDialogHeader>
                    <AlertDialogBody id="sample-body">
                        Are you sure you want to delete something? This action is permanent, and we're totally not just
                        flipping a field called "deleted" to "true" in our database, we're actually deleting something.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Nevermind
                        </Button>
                        <Button variantColor="error" ml={3}>
                            Yes, delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

stories.add('custom-aria', () => <SampleDialog2 />);
