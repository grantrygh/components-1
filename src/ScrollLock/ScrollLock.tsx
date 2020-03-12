import { canUseDOM } from 'exenv';
import { PureComponent } from 'react';
import { TouchScrollable } from './TouchScrollable';
import { pipe } from './utils';
import withLockSheet from './withLockSheet';
import withTouchListeners from './withTouchListeners';

type Props = {
    // whether or not to replace the void left by now absent scrollbars with padding
    accountForScrollbars: boolean;
    // allow touch-scroll on this element
    children?: any;
    // whether or not the lock is active
    isActive: boolean;
};

class ScrollLockComponent extends PureComponent<Props> {
    initialHeight: number;

    static defaultProps = {
        accountForScrollbars: true,
        children: null,
        isActive: true,
    };

    componentDidMount() {
        if (!canUseDOM) return;
        this.initialHeight = window.innerHeight;
    }
    componentWillUnmount() {
        const offset = window.innerHeight - this.initialHeight;

        // adjust scroll if the window has been resized since the lock was engaged
        // e.g. mobile safari dynamic chrome heights
        if (offset) {
            window.scrollTo(0, window.pageYOffset + offset);
        }

        // reset the initial height in case this scroll lock is used again
        this.initialHeight = window.innerHeight;
    }

    render() {
        const { children } = this.props;

        return children ? <TouchScrollable>{children}</TouchScrollable> : null;
    }
}

// attach the stylesheet and inject styles on [un]mount
const compose = pipe(withTouchListeners, withLockSheet);
const SheetLock = compose(ScrollLockComponent);

// toggle the lock based on `isActive` prop
export const ScrollLock = (props: Props) => (props.isActive ? <SheetLock {...props} /> : props.children);
