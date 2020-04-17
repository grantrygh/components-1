import * as React from 'react';
import { BoxProps } from '../Box/types';
import { Omit } from '../common-types';
import { PseudoBoxProps } from '../PseudoBox';

interface ISlider {
    value?: number;
    defaultValue?: number;
    isDisabled?: boolean;
    max?: number;
    min?: number;
    step?: number;
    'aria-labelledby'?: React.AriaAttributes['aria-labelledby'];
    'aria-label'?: React.AriaAttributes['aria-label'];
    'aria-valuetext'?: React.AriaAttributes['aria-valuetext'];
    orientation?: 'horizontal' | 'vertical';
    getAriaValueText?: (value: number) => string;
    size?: 'sm' | 'md' | 'lg';
    /**
     * The color of the slider track
     *
     * 🚨Note: This should be one of the color keys in the theme that has `100` - `900` color values (e.g.`green`, `red`).
     * @see http://chakra-ui.com/theme#colors
     */
    color?: string;
    name?: string;
    id?: string;
    onChange?: (newValue: number) => void;
    children?: React.ReactNode;
}

interface ISliderContext {
    trackRef?: React.RefObject<any>;
    thumbRef?: React.RefObject<any>;
    onFocus?: BoxProps['onFocus'];
    onThumbKeyDown?: (event) => void;
    valueText?: string;
    trackPercent?: number;
    ariaLabelledBy?: ISlider['aria-labelledby'];
}

export type SliderContextProps = ISliderContext &
    Omit<ISlider, 'defaultValue' | 'step' | 'name' | 'id' | 'onChange' | 'children'>;

export type SliderProps = ISlider & Omit<BoxProps, 'onChange' | 'size'>;

export type SliderThumbProps = PseudoBoxProps;

export type SliderTrackProps = BoxProps;

export type SliderFilledTrackProps = PseudoBoxProps;
