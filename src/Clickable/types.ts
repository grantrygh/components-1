import { BoxProps } from '../Box/types';

export interface IClickable {
    onClick?: (e) => void;
    href?: string;

    /* component or HTML element to use. Box by default */
    as?: any;

    innerRef?: any;
    staticContext?: any;
    target?: string;
}

export type ClickableProps = IClickable & BoxProps;
