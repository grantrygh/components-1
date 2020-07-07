import { BoxProps } from '../Box/types';
import { PopperProps } from '../Popper/types';

export interface ITooltip {
    'aria-label'?: string;
    /**
     * The delay in `ms` for the tooltip to show
     */
    showDelay?: number;
    /**
     * The delay in `ms` for the tooltip to hide
     */
    hideDelay?: number;
    /**
     * The label of the tooltip.
     */
    label?: string | any;
    /**
     * The `ReactNode` to be used as the trigger of the tooltip.
     */
    children: any;
    /**
     * If `true` display an arrow tip on the tooltip.
     */
    hasArrow?: boolean;
    placement?: PopperProps['placement'];
    /**
     * If `true` hide the tooltip, when the trigger is clicked.
     */
    closeOnClick?: boolean;
    /**
     * If `true`, the tooltip is initially shown.
     */
    defaultIsOpen?: boolean;
    /**
     * If `true`, the tooltip is shown.
     */
    isOpen?: boolean;
    /**
     * If `true`, the tooltip will wrap the children in a `span` with `tabIndex=0`
     */
    shouldWrapChildren?: boolean;
    /**
     * Function called when the tooltip shows.
     */
    onOpen?: () => void;
    /**
     * Function called when the tooltip hides.
     */
    onClose?: () => void;

    // If set to false, will just return children without tooltip popper.
    showTooltip?: boolean;
}

export type TooltipProps = ITooltip & BoxProps;
