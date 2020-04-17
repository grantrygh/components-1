// @flow
import { canUseEventListeners } from 'exenv';
import { cloneElement, PureComponent } from 'react';
import { TouchScrollableProps } from './types';
import { allowTouchMove, listenerOptions, preventInertiaScroll } from './utils';

export class TouchScrollable extends PureComponent<TouchScrollableProps> {
    scrollableArea: HTMLElement;

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

    getScrollableArea = (ref: HTMLElement) => {
        this.scrollableArea = ref;
    };

    render() {
        const { children, ...rest } = this.props;

        return typeof children === 'function'
            ? children(this.getScrollableArea)
            : cloneElement(children, { ref: this.getScrollableArea, ...rest });
    }
}
