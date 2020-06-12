import BellOutlineIcon from 'mdi-react/BellOutlineIcon';
import ExternalLinkIcon from 'mdi-react/ExternalLinkIcon';
import React, { useRef, useState } from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    Stack,
} from '../../../../src';
import { CanvasMenu } from '../../../../src/CanvasMenu';

export const NotificationsPanel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    const cancelRef = useRef();

    const notificationsItems = {
        header: [
            {
                label: 'Notifications Header',
                icon: BellOutlineIcon,
                href: null,
            },
        ],
        footer: [
            {
                label: 'Notifications Footer',
                icon: ExternalLinkIcon,
                onClick: onOpen,
                mb: 0,
            },
        ],
    };
    return (
        <CanvasMenu items={notificationsItems}>
            <Stack>
                <Box>Notification</Box>
                <Box>Notification</Box>
                <Box>Notification</Box>
                <Box>Notification</Box>
            </Stack>
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
        </CanvasMenu>
    );
};
