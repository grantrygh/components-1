import { motion } from 'framer-motion';
import React, { forwardRef } from 'react';
import InView from 'react-intersection-observer';
import { Box } from '../Box';
import { valueToPercent } from '../Slider/utils';

export const AnimatedProgressIndicator = (props) => {
    return (
        <InView>
            {({ inView, ref, entry }) => {
                return <AnimatedProgressIndicatorBar ref={ref} inView={inView} {...props} />;
            }}
        </InView>
    );
};

export const AnimatedProgressIndicatorBar = forwardRef(
    ({ isIndeterminate = false, min, max, value, baseColor = null, inView = true, ...rest }, ref) => {
        const percent = valueToPercent(value, min, max);

        return (
            <Box ref={ref} h="100%" w="100%" bg={baseColor}>
                {inView && (
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{
                            duration: 1,
                            ease: 'easeInOut',
                        }}
                        style={{ height: '100%' }}
                    >
                        <Box
                            height="100%"
                            aria-valuemax={max}
                            aria-valuemin={min}
                            aria-valuenow={isIndeterminate ? null : value}
                            role="progressbar"
                            transition="all 0.3s"
                            width={`${percent}%`}
                            {...rest}
                        />
                    </motion.div>
                )}
            </Box>
        );
    }
);
