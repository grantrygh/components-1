import { motion } from 'framer-motion';
import React from 'react';
import InView from 'react-intersection-observer';
import { Box } from '../Box';
import { valueToPercent } from '../Slider/utils';

export const AnimatedProgressIndicator = ({ isIndeterminate, min, max, value, ...rest }) => {
    const percent = valueToPercent(value, min, max);

    return (
        <InView>
            {({ inView, ref, entry }) => {
                return (
                    <Box ref={ref} h="100%" w="100%">
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
            }}
        </InView>
    );
};
