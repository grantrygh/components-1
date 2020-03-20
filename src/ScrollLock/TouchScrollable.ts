// @flow
import { canUseEventListeners } from 'exenv';
import { cloneElement, PureComponent } from 'react';
import { allowTouchMove, listenerOptions, preventInertiaScroll } from './utils';

type Props = {
    // allow touch-scroll on this element
    children: any;
};

export class TouchScrollable extends PureComponent<Props> {
    scrollableArea: HTMLElement;
    getScrollableArea = (ref: HTMLElement) => {
        this.scrollableArea = ref;
    };
    componentDidMount() {
        if (!canUseEventListeners) return;

        this.scrollableArea.addEventListener('touchstart', preventInertiaScroll, listenerOptions);
        this.scrollableArea.addEventListener('touchmove', allowTouchMove, listenerOptions);
    }
    componentWillUnmount() {
        if (!canUseEventListeners) return;

        this.scrollableArea.removeEventListener('touchstart', preventInertiaScroll, listenerOptions);
        this.scrollableArea.removeEventListener('touchmove', allowTouchMove, listenerOptions);
    }
    render() {
        const { children, ...rest } = this.props;

        return typeof children === 'function'
            ? children(this.getScrollableArea)
            : cloneElement(children, { ref: this.getScrollableArea, ...rest });
    }
}
