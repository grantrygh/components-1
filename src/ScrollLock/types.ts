interface OneChildrenElement {
    // allow touch-scroll on this element
    children?: any;
}

interface IScrollLock extends OneChildrenElement {
    // whether or not to replace the void left by now absent scrollbars with padding
    accountForScrollbars: boolean;
    // whether or not the lock is active
    isActive: boolean;
}

export type ScrollLockProps = IScrollLock;
export type TouchScrollableProps = OneChildrenElement;
