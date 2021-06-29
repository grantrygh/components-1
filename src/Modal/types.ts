import * as React from 'react';
import { BoxProps } from '../Box/types';
import { PortalProps } from '../Portal/types';
import { UseModalProps, UseModalReturn } from './use-modal';

export type ModalSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | 'full';

export interface ModalProps extends UseModalProps, ModalOptions {
    children: any;

    /**
     * Where scroll behavior should originate.
     * - If set to `outside`, the entire `ModalContent` will scroll within the viewport.
     *
     * @default "outside"
    f */
    scrollBehavior?: ScrollBehavior;
    /**
     * Props to be forwarded to the portal component
     */
    portalProps?: PortalProps;
    /**
     * The transition that should be used for the modal
     */
    motionPreset?: MotionPreset;
}
export interface ModalOptions {
    /**
     *  If `true`, the modal will be centered on screen.
     * @default true
     */
    isCentered?: boolean;
    /**
     * The size (maxWidth) of the modal.
     */
    size?: ModalSizes | BoxProps['maxWidth'];
    /**
     * Skip applying styling to modal
     */
    noStyles?: boolean;
    /**
     * If `false`, focus lock will be disabled completely.
     *
     * This is useful in situations where you still need to interact with
     * other surrounding elements.
     *
     * 🚨Warning: We don't recommend doing this because it hurts the
     * accessibility of the modal, based on WAI-ARIA specifications.
     *
     * @default true
     */
    trapFocus?: boolean;
    /**
     * Lock focus across frames
     *
     * @default true
     */
    lockFocusAcrossFrames?: boolean;
    /**
     * If `true`, the modal will autofocus the first enabled and interactive
     * element within the `ModalContent`
     *
     * @default true
     */
    autoFocus?: boolean;
    /**
     * The `ref` of element to receive focus when the modal opens.
     */
    initialFocusRef?: React.RefObject<Element>;
    /**
     * The `ref` of element to receive focus when the modal closes.
     */
    finalFocusRef?: React.RefObject<Element>;
    /**
     * If `true`, the modal will return focus to the element that triggered it when it closes.
     * @default true
     */
    returnFocusOnClose?: boolean;
    /**
     * If `true`, scrolling will be disabled on the `body` when the modal opens.
     *  @default true
     */
    blockScrollOnMount?: boolean;
    /**
     * Handle zoom/pinch gestures on iOS devices when scroll locking is enabled.
     * Defaults to `false`.
     */
    allowPinchZoom?: boolean;
    /**
     * If `true`, a `padding-right` will be applied to the body element
     * that's equal to the width of the scrollbar.
     *
     * This can help prevent some unpleasant flickering effect
     * and content adjustment when the modal opens
     */
    preserveScrollBarGap?: boolean;
}

export type ScrollBehavior = 'inside' | 'outside';

export type MotionPreset = 'slideInBottom' | 'slideInRight' | 'scale' | 'none';

export interface ModalContext extends ModalOptions, UseModalReturn {
    /**
     * The transition that should be used for the modal
     */
    motionPreset?: MotionPreset;

    scrollBehavior: string;
}

export type ModalContentProps = BoxProps & {
    /**
     * The props to forward to the modal's content wrapper
     */
    containerProps?: any;
};
