/** @jsx jsx */
import { jsx, keyframes } from '@emotion/core';
import { forwardRef } from 'react';
import Box from '../Box';
import VisuallyHidden from '../VisuallyHidden';
import useSpinnerStyle from './styles';
import { SpinnerProps } from './types';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

/**
 * Spinner is used for indicating a loading state of a component or page.
 *
 * RECOMMENDED: Add `aria-busy="true"` to the component that triggered the loading state while the spinner is shown.
 */
export const Spinner = forwardRef(
    ({ size, label = 'Loading...', thickness, speed = '0.5s', color, emptyColor, ...props }: SpinnerProps, ref) => {
        const spinnerStyleProps = useSpinnerStyle({
            size,
            thickness,
            color,
            emptyColor,
        });

        return (
            <Box
                ref={ref}
                display="inline-block"
                animation={`${spin} ${speed} linear infinite`}
                {...spinnerStyleProps}
                {...props}
            >
                {label && <VisuallyHidden>{label}</VisuallyHidden>}
            </Box>
        );
    }
);
