/**
 * Slider Component
 *
 * The following code is a derivative of the amazing work done by the Material UI team.
 * Original source: https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Slider/Slider.js
 */

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { createContext, forwardRef, RefObject, useCallback, useContext, useRef, useState } from 'react';
import Box from '../Box';
import { useForkRef } from '../hooks/useForkRef';
import PseudoBox from '../PseudoBox';
import useSliderStyle from './styles';
import { SliderContextProps, SliderFilledTrackProps, SliderProps, SliderThumbProps, SliderTrackProps } from './types';
import { clampValue, percentToValue, roundValueToStep, valueToPercent } from './utils';

const SliderContext = createContext<SliderContextProps>({});

const useSliderContext = () => {
    return useContext(SliderContext);
};

export const SliderThumb = forwardRef((props: SliderThumbProps, ref) => {
    const {
        thumbRef,
        isDisabled,
        onFocus,
        onThumbKeyDown: onKeyDown,
        min,
        max,
        valueText,
        orientation,
        trackPercent,
        size,
        value,
        ariaLabelledBy,
    } = useSliderContext();
    const { thumb: thumbStyleProps } = useSliderStyle({
        trackPercent,
        size,
    });
    const sliderThumbRef = useForkRef(thumbRef, ref);

    return (
        <PseudoBox
            data-slider-thumb=""
            d="flex"
            alignItems="center"
            outline="none"
            justifyContent="center"
            onFocus={onFocus}
            ref={sliderThumbRef}
            role="slider"
            tabIndex={isDisabled ? undefined : 0}
            aria-disabled={isDisabled}
            aria-valuemin={min}
            aria-valuetext={valueText}
            aria-orientation={orientation}
            aria-valuenow={value}
            aria-valuemax={max}
            aria-labelledby={ariaLabelledBy}
            onKeyDown={onKeyDown}
            {...thumbStyleProps}
            {...props}
        />
    );
});

export const SliderTrack = (props: SliderTrackProps) => {
    const { trackRef, isDisabled, size } = useSliderContext();
    const { track: trackStyleProps } = useSliderStyle({
        size,
    });
    return <Box data-slider-track="" aria-disabled={isDisabled} ref={trackRef} {...trackStyleProps} {...props} />;
};

export const SliderFilledTrack = (props: SliderFilledTrackProps) => {
    const { isDisabled, size, color, trackPercent } = useSliderContext();
    const { filledTrack: filledTrackStyleProps } = useSliderStyle({
        size,
        color,
        trackPercent,
    });
    return <PseudoBox aria-disabled={isDisabled} data-slider-filled-track="" {...filledTrackStyleProps} {...props} />;
};

export const Slider = forwardRef(
    (
        {
            value: controlledValue,
            defaultValue,
            onChange,
            onKeyDown,
            onFocus,
            onBlur,
            onMouseDown,
            isDisabled,
            max = 100,
            min = 0,
            step = 1,
            'aria-labelledby': ariaLabelledBy,
            'aria-label': ariaLabel,
            'aria-valuetext': ariaValueText,
            orientation = 'horizontal',
            getAriaValueText,
            size,
            color,
            name,
            id,
            children,
            ...rest
        }: SliderProps,
        ref
    ) => {
        const { current: isControlled } = useRef(controlledValue != null);
        const [value, setValue] = useState(defaultValue || 0);

        const _value = isControlled ? controlledValue : value;
        const actualValue = clampValue(_value, min, max);

        const trackPercent = valueToPercent(actualValue, min, max);

        const { root: rootStyleProps } = useSliderStyle({});

        const trackRef: RefObject<HTMLElement> = useRef();
        const thumbRef: RefObject<HTMLElement> = useRef();

        const getNewValue = event => {
            if (trackRef.current) {
                const { left, width } = trackRef.current.getBoundingClientRect();
                const { clientX } = event.touches ? event.touches[0] : event;
                const diffX = clientX - left;
                const percent = diffX / width;
                let newValue = percentToValue(percent, min, max);

                if (step) {
                    newValue = roundValueToStep(newValue, step);
                }

                newValue = clampValue(newValue, min, max);

                return newValue;
            }

            return null;
        };

        const updateValue = useCallback(
            newValue => {
                if (!isControlled) {
                    setValue(newValue);
                }
                if (onChange) {
                    onChange(newValue);
                }
            },
            [isControlled, onChange]
        );

        const handleThumbKeyDown = event => {
            let flag = false;
            let newValue;
            const tenSteps = (max - min) / 10;

            switch (event.key) {
                case 'ArrowLeft':
                case 'ArrowDown':
                    newValue = actualValue - step;
                    flag = true;
                    break;
                case 'ArrowRight':
                case 'ArrowUp':
                    newValue = actualValue + step;
                    flag = true;
                    break;
                case 'PageDown':
                    newValue = actualValue - tenSteps;
                    flag = true;
                    break;
                case 'PageUp':
                    newValue = actualValue + tenSteps;
                    flag = true;
                    break;
                case 'Home':
                    newValue = min;
                    flag = true;
                    break;
                case 'End':
                    newValue = max;
                    flag = true;
                    break;
                default:
                    return;
            }

            if (flag) {
                event.preventDefault();
                event.stopPropagation();
            }
            if (step) {
                newValue = roundValueToStep(newValue, step);
            }
            newValue = clampValue(newValue, min, max);
            updateValue(newValue);

            if (onKeyDown) {
                onKeyDown(event);
            }
        };

        // TODO: Optimize this mouseMove event
        const handleMouseMove = event => {
            const newValue = getNewValue(event);
            updateValue(newValue);
        };

        const handleMouseUp = () => {
            document.body.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('touchmove', handleMouseMove);
            document.body.removeEventListener('mouseup', handleMouseUp);
            document.body.removeEventListener('touchend', handleMouseUp);
        };

        const handleMouseDown = event => {
            if (isDisabled) return;
            if (onMouseDown) {
                onMouseDown(event);
            }
            event.preventDefault();

            const newValue = getNewValue(event);
            if (newValue !== actualValue) {
                updateValue(newValue);
            }

            document.body.addEventListener('mousemove', handleMouseMove);
            document.body.addEventListener('touchmove', handleMouseMove);
            document.body.addEventListener('mouseup', handleMouseUp);
            document.body.addEventListener('touchend', handleMouseUp);

            if (thumbRef.current) {
                thumbRef.current.focus();
            }
        };

        const valueText = getAriaValueText ? getAriaValueText(actualValue) : ariaValueText;

        const context = {
            trackRef,
            thumbRef,
            onThumbKeyDown: handleThumbKeyDown,
            onFocus,
            trackPercent,
            ariaLabelledBy,
            orientation,
            isDisabled,
            size,
            color,
            min,
            max,
            valueText,
            value: actualValue,
        };

        return (
            <SliderContext.Provider value={context}>
                <Box
                    role="presentation"
                    tabIndex="-1"
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleMouseDown}
                    onMouseLeave={handleMouseUp}
                    onTouchEnd={handleMouseUp}
                    onBlur={event => {
                        handleMouseUp();
                        if (onBlur) {
                            onBlur(event);
                        }
                    }}
                    aria-disabled={isDisabled}
                    ref={ref}
                    css={{ touchAction: 'none' }}
                    {...rootStyleProps}
                    {...rest}
                >
                    {children}
                    <input type="hidden" value={actualValue} name={name} id={id} />
                </Box>
            </SliderContext.Provider>
        );
    }
);
