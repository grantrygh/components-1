import * as React from 'react';
import { Omit } from '../common-types';
import { IModal } from '../Modal/types';

export interface IAlertDialog extends Omit<IModal, 'initialFocusRef'> {
    leastDestructiveRef: React.RefObject<HTMLElement>;
}
