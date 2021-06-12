import { motion } from 'framer-motion';
import * as React from 'react';
import { scaleFadeConfig } from '../Transition/scale-fade';
import { slideFadeConfig } from '../Transition/slide-fade';

export interface ModalTransitionProps {
    preset: 'slideInBottom' | 'slideInRight' | 'scale' | 'none';
    children?: any;
}

const transitions = {
    slideInBottom: {
        ...slideFadeConfig,
        custom: { offsetY: 16, reverse: true },
    },
    slideInRight: {
        ...slideFadeConfig,
        custom: { offsetX: 16, reverse: true },
    },
    scale: {
        ...scaleFadeConfig,
        custom: { initialScale: 0.95, reverse: true },
    },
    none: {},
};

const Motion = motion.section;

export const ModalTransition = React.forwardRef((props: ModalTransitionProps, ref: React.Ref<any>) => {
    const { preset, ...rest } = props;
    const motionProps = transitions[preset];

    return <Motion ref={ref} {...motionProps} {...rest} />;
});
