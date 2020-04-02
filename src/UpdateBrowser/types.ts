import * as React from 'react';
import { BoxProps } from '../Box/types';

export type UpdateBrowserProps = BoxProps & {
    onClick?: React.MouseEventHandler<HTMLElement>;

    // "Remind me later" button href
    href: string;
};
