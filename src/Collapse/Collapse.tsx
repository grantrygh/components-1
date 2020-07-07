import React, { forwardRef } from 'react';
import AnimateHeight from 'react-animate-height';
import { Box } from '../Box';
import useCollapseStyle from './styles';
import { CollapseProps } from './types';

export const Collapse = forwardRef(
    (
        {
            isOpen,
            animateOpacity = true,
            onAnimationStart,
            onAnimationEnd,
            duration,
            easing,
            startingHeight,
            endingHeight,
            ...rest
        }: CollapseProps,
        ref: any
    ) => {
        const collapseStyleProps = useCollapseStyle({
            duration,
            easing,
            isOpen,
            startingHeight,
            endingHeight,
        });
        return (
            <AnimateHeight
                animateOpacity={animateOpacity}
                applyInlineTransitions={false}
                {...collapseStyleProps}
                {...{ onAnimationStart, onAnimationEnd }}
            >
                <Box ref={ref} {...rest} />
            </AnimateHeight>
        );
    }
);
