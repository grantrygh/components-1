import * as React from 'react';
import { BoxProps } from '../Box/types';
import { Omit } from '../common-types';
import { IInput } from '../Input/types';

interface IInputElement {
    /**
     * The size of the adornment is inherited from the `InputGroup` via `cloneElement`.
     */
    size?: IInput['size'];
    /**
     * The position this adornment should appear relative to the `Input`.
     * We added `InputLeftElement` and `InputRightElement` so you might not need to pass this
     */
    placement?: 'left' | 'right';
    /**
     * The content of the component, normally a string.
     */
    children: React.ReactNode;
    /**
     * Disable pointer events on this component.
     * This allows for the content of the adornment to focus the input on click.
     */
    disablePointerEvents?: boolean;
}

export type InputElementProps = IInputElement & BoxProps;

export type InputLeftElementProps = Omit<InputElementProps, 'placement'>;
export type InputRightElementProps = Omit<InputElementProps, 'placement'>;
