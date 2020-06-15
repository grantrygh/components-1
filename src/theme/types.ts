/* eslint-disable max-lines */
import * as SS from 'styled-system';
import { Omit } from '../common-types';

interface Shadows {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    outline: string;
    inner: string;
    none: string;
    card: string;
    button: string;
    menu: string;
    raised: string;
    toast: string;
    modal: string;
}

export interface ColorHues {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
}

type Breakpoints = {
    basis: string[];
    sm: string;
    md: string;
    lg: string;
    xl: string;
    stripped: { sm: number; md: number; lg: number; xl: number };
};

type StringOrNumber = string | number;
interface ZIndices {
    hide: number;
    auto: string;
    base: number;
    docked: number;
    dropdown: number;
    sticky: number;
    banner: number;
    panel: number;
    overlay: number;
    modal: number;
    popover: number;
    skipLink: number;
    toast: number;
    tooltip: number;
}

interface Radii {
    none: string;
    sm: string;
    md: string;
    lg: string;
    full: string;
    radius: string;
}

interface Borders {
    none: StringOrNumber;
    '1px': StringOrNumber;
    '2px': StringOrNumber;
    '4px': StringOrNumber;
}

export interface Colors {
    transparent: string;
    current: string;
    // brand
    primary: string;
    secondary: ColorHues;
    // states
    success: ColorHues;
    info: ColorHues;
    warning: ColorHues;
    error: ColorHues;
    // neutral scale colors
    neutral: ColorHues;
    black: string;
    titleText: string;
    bodyText: string;
    faintText: string;
    disabled: string;
    border: string;
    altBg: string;
    white: string;
    // component specific
    navBg: string;
    canvasBg: string;
    pageBg: string;
    tooltip: string;
    cardBg: string;
    popoverBg: string;
    progress: string;
    track: string;
    thumb: string;
    // palette
    whiteAlpha: ColorHues;
    blackAlpha: ColorHues;
    gray: ColorHues;
    red: ColorHues;
    orange: ColorHues;
    yellow: ColorHues;
    green: ColorHues;
    teal: ColorHues;
    blue: ColorHues;
    cyan: ColorHues;
    purple: ColorHues;
    pink: ColorHues;
    // social
    linkedin: ColorHues;
    facebook: ColorHues;
    messenger: ColorHues;
    whatsapp: ColorHues;
    twitter: ColorHues;
    telegram: ColorHues;
}

export type VariantColor = keyof Omit<Colors, 'transparent' | 'current'>;

interface BaseSizes {
    px: string;
    '0': string;
    '1': string;
    '2': string;
    '3': string;
    '4': string;
    '5': string;
    '6': string;
    '8': string;
    '10': string;
    '12': string;
    '16': string;
    '20': string;
    '24': string;
    '32': string;
    '40': string;
    '48': string;
    '56': string;
    '64': string;
}

interface LargeSizes {
    full: string;
    '3xs': string;
    '2xs': string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
}

interface Containers {
    sm: string;
    md: string;
    lg: string;
    xl: string;
}

interface Spacing {
    'spacing-xs': string;
    'spacing-sm': string;
    spacing: string;
    'spacing-lg': string;
}

interface Input {
    // Heights
    lg: string;
    md: string;
    sm: string;

    // Widths
    width: string;
}

interface Canvas {
    width: string;
    spacing: string;
}

type Sizes = BaseSizes &
    LargeSizes & {
        containers: Containers;
        spacing: Spacing;
        input: Input;
        canvas: Canvas;
    };

interface Inputs {
    sm: string;
    md: string;
    lg: string;
    width: string;
}

type Space = BaseSizes & {
    input: Inputs;
    header: string;
};

interface LetterSpacings {
    tighter: string;
    tight: string;
    normal: string;
    wide: string;
    wider: string;
    widest: string;
}

interface LineHeights {
    normal: string;
    none: string;
    shorter: string;
    short: string;
    base: string;
    tall: string;
    taller: string;
}

interface FontWeights {
    hairline: number;
    thin: number;
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
    extrabold: number;
    black: number;
}

interface Fonts {
    heading: string;
    body: string;
    mono: string;
}

interface FontSizes {
    smallBody: string;
    body: string;
    largeBody: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
}

interface Typography {
    letterSpacings: LetterSpacings;
    lineHeights: LineHeights;
    fontWeights: FontWeights;
    fonts: Fonts;
    fontSizes: FontSizes;
}

interface Opacity {
    '0': string;
    '20%': string;
    '40%': string;
    '60%': string;
    '80%': string;
    '100%': string;
}

export interface DefaultTheme extends Typography {
    breakpoints: Breakpoints['basis'];
    breakpoint: Breakpoints;
    zIndices: ZIndices;
    radii: Radii;
    opacity: Opacity;
    borders: Borders;
    colors: Colors;
    sizes: Sizes;
    shadows: Shadows;
    space: Space;
    icons: Record<string, Icon>;
    styles: any;
}

interface Icon {
    path: JSX.Element;
    viewBox?: string;
}

export type IconsType = Record<string, Icon>;

export interface CustomTheme extends SS.Theme {
    icons?: IconsType;
}

export type ITheme = DefaultTheme;

export type componentStyleDef<Props = any> = (props: Props, theme: DefaultTheme) => { style: any; [key: string]: any };
