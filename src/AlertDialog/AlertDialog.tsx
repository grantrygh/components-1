import React, { forwardRef } from 'react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '../Modal';
import { ModalContentProps } from '../Modal/types';
import { IAlertDialog } from './types';

// const formatIds = id => ({
//     content: `alert-dialog-${id}`,
//     header: `alert-dialog-${id}-label`,
//     body: `alert-dialog-${id}-desc`,
// });

const AlertDialog = ({ leastDestructiveRef, children, ...props }: IAlertDialog) => (
    // TODO: @grantr
    // confirm formatIds isn't needed
    <Modal /*formatIds={formatIds}*/ initialFocusRef={leastDestructiveRef} {...props}>
        {children}
    </Modal>
);

const AlertDialogContent = forwardRef((props: ModalContentProps, ref) => (
    <ModalContent ref={ref} role="alertdialog" {...props}>
        {props.children}
    </ModalContent>
));

export {
    AlertDialog,
    AlertDialogContent,
    ModalOverlay as AlertDialogOverlay,
    ModalBody as AlertDialogBody,
    ModalHeader as AlertDialogHeader,
    ModalFooter as AlertDialogFooter,
    ModalCloseButton as AlertDialogCloseButton,
};
