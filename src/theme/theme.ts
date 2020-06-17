import icons from '../IconPaths';
import colors from './colors';
import sizes, { baseSizes } from './sizes';
import typography from './typography';

const space = {
    ...baseSizes,
    ...sizes.spacing,
    input: sizes.input,
    canvas: sizes.canvas,
    header: sizes.header,
};

const shadows = (providedTheme, mode) => {
    const modes = {
        light: {
            topNav: '0 2px 8px 0 rgba(38,38,38,0.08)',
            card: '0 0 1px 0 rgba(38,38,38,0.08), 0 0 2px 0 rgba(89,89,89,0.16)',
            pressed: '0 0 1px 0 rgba(38,38,38,0.08), 0 0.5px 2px 0 rgba(89,89,89,0.16)',
            button: '0 0 1px 0 rgba(38,38,38,0.04), 0 2px 4px 0 rgba(89,89,89,0.16)',
            menu: '0 0 2px 0 rgba(38,38,38,0.04), 0 4px 8px 0 rgba(89,89,89,0.16)',
            raised: '0 2px 4px 0 rgba(38,38,38,0.04), 0 8px 16px 0 rgba(89,89,89,0.16)',
            toast: '0 2px 8px 0 rgba(38,38,38,0.04), 0 16px 24px 0 rgba(89,89,89,0.16)',
            modal: '0 2px 8px 0 rgba(38,38,38,0.08), 0 20px 32px 0 rgba(89,89,89,0.24)',
            outline: '0 0 0 3px rgba(192, 213, 245, 0.6)',
        },
        dark: {
            topNav: '0 2px 8px 0 rgba(0,0,0,0.08)',
            card: '0 0 1px 0 rgba(0,0,0,0.08), 0 0 2px 0 rgba(0,0,0,0.16)',
            pressed: '0 0 1px 0 rgba(0,0,0,0.08), 0 0.5px 2px 0 rgba(0,0,0,0.16)',
            button: '0 0 1px 0 rgba(0,0,0,0.04), 0 2px 4px 0 rgba(0,0,0,0.16)',
            menu: '0 0 2px 0 rgba(0,0,0,0.04), 0 4px 8px 0 rgba(0,0,0,0.16)',
            raised: '0 2px 4px 0 rgba(0,0,0,0.04), 0 8px 16px 0 rgba(0,0,0,0.16)',
            toast: '0 2px 8px 0 rgba(0,0,0,0.04), 0 16px 24px 0 rgba(0,0,0,0.16)',
            modal: '0 2px 8px 0 rgba(0,0,0,0.08), 0 20px 32px 0 rgba(0,0,0,0.24)',
            outline: '0 0 0 3px rgba(142, 163, 195, 0.25)',
        },
    };
    return {
        sm: '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
        none: 'none',
        // design elevations
        ...modes[mode],

        ...((providedTheme?.shadows && providedTheme.shadows[mode]) || {}),
    };
};

const basis = ['480px', '768px', '992px', '1280px', '1600px'];
const breakpoints = {
    basis,
    // aliases
    sm: basis[0],
    md: basis[1],
    lg: basis[2],
    xl: basis[3],
    hd: basis[4],
    stripped: {
        sm: parseInt(basis[0], 10),
        md: parseInt(basis[1], 10),
        lg: parseInt(basis[2], 10),
        xl: parseInt(basis[3], 10),
        hd: parseInt(basis[4], 10),
    },
};

const zIndices = {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 900,
    sticky: 1000,
    banner: 1100,
    panel: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
};

const baseRadii = {
    none: '0',
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
    full: '9999px',
};

const radii = {
    ...baseRadii,
    radius: '0.375rem', // radius var for component consistency
};

const opacity = {
    '0': '0',
    '20%': '0.2',
    '40%': '0.4',
    '60%': '0.6',
    '80%': '0.8',
    '100%': '1',
};

const borders = {
    none: 0,
    '1px': '1px solid',
    '2px': '2px solid',
    '4px': '4px solid',
};

// const borderWidths = {
//   xl: "2rem",
//   lg: "1rem",
//   md: "0.5rem",
//   sm: "0.25rem",
//   xs: "0.125rem",
//   "2xs": "0.0625rem",
//   none: 0
// };

export const baseTheme = ({ providedTheme = {}, mode = 'light' }) => {
    const colorScheme = colors(providedTheme, mode);
    const shadowScheme = shadows(providedTheme, mode);

    return {
        breakpoints: breakpoints['basis'], // emotion theme needs to be passed an string array of breakpoints
        breakpoint: breakpoints,
        zIndices,
        radii,
        opacity,
        borders,
        ...typography,
        sizes,
        space,
        icons,

        // component styles
        // add to this in custom theme to override component styling
        styles: {},

        // custom theme
        ...providedTheme,

        // colors and shadows merge in with default theme
        colors: colorScheme,
        shadows: shadowScheme,
    };
};

export const theme = baseTheme({});

export type ThemeType = typeof theme;
