import { BoxProps } from 'Box/types';

export interface IClickable {
    onClick?: (e) => void;
    href?: string;

    /* HTML element to use. div by default */
    element?: any;

    innerRef?: any;
    staticContext?: any;
}

export type ClickableProps = IClickable & BoxProps;
