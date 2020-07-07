import * as React from 'react';
import { PseudoBoxProps } from '../PseudoBox';

export interface ILink {
    /**
     *  If `true`, the link will open in new tab
     */
    isExternal?: boolean;
    /**
     * If `true`, the link will be disabled and not tabbable
     */
    isDisabled?: boolean;
    /**
     * Action to perform when clicked
     */
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    variant?: string;
    children?: any;
}

export type LinkProps = ILink & React.HTMLProps<HTMLAnchorElement> & PseudoBoxProps;
