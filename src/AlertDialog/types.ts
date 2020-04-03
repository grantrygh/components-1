import * as React from 'react';
import { Omit } from '../common-types';
import { IModal } from '../Modal/types';

interface IAlertDialog extends Omit<IModal, 'initialFocusRef'> {
    leastDestructiveRef: React.RefObject<HTMLElement>;
}

export type AlertDialogProps = IAlertDialog;
