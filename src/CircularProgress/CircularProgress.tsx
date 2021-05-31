import { keyframes } from '@emotion/react';
import React, { forwardRef } from 'react';
import { Box } from '../Box';
import useCircularProgressStyle from './styles';
import { CircularProgressLabelProps, CircularProgressProps } from './types';

const circularProgressCircle = keyframes`
  0% {
    stroke-dasharray: 1, 400;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 400, 400;
    stroke-dashoffset: -100;
  }

  100% {
    stroke-dasharray: 400, 400;
    stroke-dashoffset: -300;
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const CircularProgressLabel = (props: CircularProgressLabelProps) => (
    <Box
        position="absolute"
        left="50%"
        top="50%"
        lineHeight="1"
        textAlign="center"
        transform="translate(-50%, -50%)"
        css={{ fontVariantNumeric: 'tabular-nums' }}
        {...props}
    >
        {props.children}
    </Box>
);

export const CircularProgress = forwardRef((props: CircularProgressProps, ref) => {
    const {
        size,
        max,
        min,
        isIndeterminate,
        thickness,
        value,
        angle,
        capIsRound,
        children,
        trackColor,
        color,
        ...rest
    } = props;

    const {
        root: rootStyleProps,
        svg: svgStyleProps,
        track: trackStyleProps,
        indicator: indicatorStyleProps,
    } = useCircularProgressStyle({
        min,
        max,
        value,
        size,
        angle,
        thickness,
        capIsRound,
        isIndeterminate,
        color,
        trackColor,
        spin,
        circularProgressCircle,
    });

    return (
        <Box ref={ref} {...rootStyleProps} {...rest}>
            <Box {...svgStyleProps}>
                <Box {...trackStyleProps} data-progress-track />
                <Box {...indicatorStyleProps} data-progress-indicator />
            </Box>
            {children}
        </Box>
    );
});
