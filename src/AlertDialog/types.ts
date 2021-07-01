import * as React from 'react';
import { Omit } from '../common-types';
import { ModalProps } from '../Modal/types';

export interface IAlertDialog extends Omit<ModalProps, 'initialFocusRef'> {
    leastDestructiveRef: React.RefObject<HTMLElement>;
}
