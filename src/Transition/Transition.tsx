/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Transition } from 'react-spring/renderprops.cjs';
import useTransitionStyle from './styles';
import { ScaleProps, SlideInProps, SlideProps } from './types';

// Easing function from d3-ease: https://github.com/d3/d3-ease/blob/master/src/exp.js
function expOut(t) {
    return 1 - 2 ** (-10 * t);
}

// function expInOut(t) {
//   return (
//     ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) /
//     2
//   );
// }

export const Slide = ({ in: inProp, children, duration, from, finalHeight, finalWidth }: SlideProps) => {
    const { slide } = useTransitionStyle({
        from,
        finalHeight,
        finalWidth,
    });
    const { root, placement, transitionOption } = slide;
    const slideDuration = duration || root.duration;
    const { transform, offset } = transitionOption;

    return (
        <Transition
            items={inProp}
            from={{ opacity: 0, offset }}
            enter={{ opacity: 1, offset: '0%' }}
            leave={{ opacity: 0, offset }}
            config={{ duration: slideDuration, easing: expOut }}
        >
            {inPropI =>
                inPropI &&
                (styles =>
                    children(
                        {
                            willChange: 'opacity, transform',
                            opacity: styles.opacity,
                            transform: transform(styles.offset),
                            ...placement,
                        },
                        null,
                        null
                    ))
            }
        </Transition>
    );
};

export const Scale = ({ in: inProp, initialScale, duration, children, ...rest }: ScaleProps): any => {
    const { scale } = useTransitionStyle({});
    const scaleInitialScale = initialScale || scale.initialScale;
    const scaleDuration = duration || scale.duration;

    return (
        <Transition
            items={inProp}
            config={{ duration: scaleDuration }}
            from={{ opacity: 0, transform: `scale(${scaleInitialScale})` }}
            enter={{ opacity: 1, transform: `scale(1)` }}
            leave={{ opacity: 0, transform: `scale(${scaleInitialScale})` }}
            {...rest}
        >
            {inPropI =>
                inPropI &&
                (styles =>
                    children({
                        willChange: 'opacity, transform',
                        ...styles,
                        ...rest,
                    }))
            }
        </Transition>
    );
};

export const SlideIn = ({ in: inProp, offset, duration, children, ...rest }: SlideInProps) => {
    const { slideIn } = useTransitionStyle({});
    const slideInOffset = offset || slideIn.offset;
    const slideInDuration = duration || slideIn.duration;

    return (
        <Transition
            items={inProp}
            config={{ duration: slideInDuration }}
            from={{ opacity: 0, transform: `translate3d(0, ${slideInOffset}, 0)` }}
            enter={{ opacity: 1, transform: `translate3d(0, 0, 0)` }}
            leave={{ opacity: 0, transform: `translate3d(0, ${slideInOffset}, 0)` }}
            {...rest}
        >
            {inPropI =>
                inPropI &&
                (styles =>
                    children({
                        willChange: 'opacity, transform',
                        ...styles,
                        ...rest,
                    }))
            }
        </Transition>
    );
};
