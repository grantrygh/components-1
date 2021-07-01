import PopperJS from 'popper.js';
import * as React from 'react';
import { PopperProps } from '../Popper/types';
import { PseudoBoxProps } from '../PseudoBox';

export interface IPopoverContextValue {
    popoverRef?: React.RefObject<HTMLElement>;
    placement?: PopperJS.Placement;
    referenceRef?: React.RefObject<HTMLElement>;
    headerId?: string;
    bodyId?: string;
    popoverId?: string;
    onOpen?: () => void;
    onClose?: () => void;
    onToggle?: () => void;
    trigger?: 'hover' | 'click';
    isOpen?: boolean;
    onBlur?: React.FocusEventHandler<HTMLElement>;
    closeOnEsc?: boolean;
    initialFocusRef?: React.RefObject<HTMLElement>;
    isHoveringRef?: React.RefObject<boolean>;
    usePortal?: boolean;
}
export type PopoverContextValueProps = IPopoverContextValue;

// declare const PopoverContext: React.Context<{}>;
// declare const usePopoverContext: () => PopoverContextValue | undefined;

type InternalState = { isOpen?: boolean; onClose?: () => void };

/**
 * The content of the popover
 */
export type PopoverChildren =
    | {
          children: React.ReactNode;
      }
    | { children: (props: InternalState) => React.ReactNode };

interface IPopover {
    /**
     * The html `id` attribute of the popover.
     * If not provided, we generate a unique id.
     *
     * This `id` is also used to auto-generate the `aria-labelledby`
     * and `aria-decribedby` attributes that points to the `PopoverHeader` and `PopoverBody`
     */
    id?: string;
    /**
     * If `true`, the popover will be opened in controlled mode.
     */
    isOpen?: boolean;
    /**
     * If `true`, the popover will be initially opened.
     */
    defaultIsOpen?: boolean;
    /**
     * The `ref` of the element that should receive focus when the popover opens.
     */
    initialFocusRef?: React.RefObject<HTMLElement>;
    /**
     * The `ref` of the element the popover attaches to when opened. Used for site tours, for example
     */
    initialReferenceRef?: React.RefObject<HTMLElement>;
    /**
     * The interaction that triggers the popover.
     *
     * `hover` - means the popover will open when you hover with mouse or
     * focus with keyboard on the popover trigger
     *
     * `click` - means the popover will open on click or
     * press `Enter` to `Space` on keyboard
     */
    trigger?: 'hover' | 'click';
    /**
     * If `true`, the popover will return focus to the trigger when it closes
     */
    returnFocusOnClose?: boolean;
    /**
     * The placment of the popover
     */
    placement?: PopperJS.Placement;
    /**
     * If `true`, the popover will close when you blur out it by
     * clicking outside or tabbing out
     */
    closeOnBlur?: boolean;
    /**
     * If `true`, the popover will close when you hit the `Esc` key
     */
    closeOnEsc?: boolean;
    /**
     * Callback fired when the popover opens
     */
    onOpen?: () => void;
    /**
     * Callback fired when the popover closes
     */
    onClose?: () => void;
    /**
     * If true the popover is displayed with a Portal.
     * Rendering content inside a Portal allows the popover content
     * to escape the physical bounds of its parent while still being
     * positioned correctly relative to its target
     */
    usePortal?: boolean;
}
export type PopoverProps = IPopover & PopoverChildren;

export interface IPopoverTrigger {
    children: React.ReactElement;
}
export type PopoverTriggerProps = IPopoverTrigger;

interface IPopoverContent {
    onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
    onBlur?: React.FocusEventHandler<HTMLElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLElement>;
    onFocus?: React.FocusEventHandler<HTMLElement>;
    gutter?: number;
    /**
     * If the `PopoverHeading` isn't rendered, use this prop to add
     * an accessible label to the popover.
     */
    'aria-label'?: string;
}
export type PopoverContentProps = IPopoverContent & PopperProps;

interface IPopoverCloseButton {
    onClick?: React.MouseEventHandler<HTMLElement>;
}
export type PopoverCloseButtonProps = Omit<PseudoBoxProps, 'size'> & IPopoverCloseButton;
