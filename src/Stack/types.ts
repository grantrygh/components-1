import * as React from 'react';
import { BoxProps } from '../Box/types';
import { FlexProps } from '../Flex/types';

interface IStack {
    /**
     * If `true` the items will be stacked horizontally inline.
     */
    isInline?: boolean;
    /**
     * If `true` the items will be displayed in reverse order.
     */
    isReversed?: boolean;
    /**
     * The direction to stack the items.
     */
    direction?: FlexProps['direction'];
    /**
     * The content of the stack.
     */
    children?: React.ReactNode;
    /**
     * The alignment of the stack item. Similar to `align-items`
     */
    align?: FlexProps['align'];
    /**
     * The distribution of the stack item. Similar to `justify-content`
     */
    justify?: FlexProps['justify'];
    /**
     * If `true`, the children will be wrapped in a `Box` with
     * `display: inline-block`, and the `Box` will take the spacing props
     */
    shouldWrapChildren?: boolean;

    spacing?: number | string;
}

export type StackProps = IStack & BoxProps;
