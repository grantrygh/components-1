import icons from '../IconPaths';
import colors from './colors';
import sizes, { baseSizes } from './sizes';
import typography from './typography';

const space = {
    ...baseSizes,
    input: sizes.input,
    canvas: sizes.canvas,
};

const shadows = {
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.04)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    outline: '0 0 0 3px rgba(192, 213, 245, 0.6)',
    inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
    none: 'none',
    // design elevations
    topNav: '0 2px 8px 0 rgba(38,38,38,0.08)',
    card: '0 0 1px 0 rgba(38,38,38,0.08), 0 0 2px 0 rgba(89,89,89,0.16)',
    pressed: '0 0 1px 0 rgba(38,38,38,0.08), 0 0.5px 2px 0 rgba(89,89,89,0.16)',
    button: '0 0 1px 0 rgba(38,38,38,0.04), 0 2px 4px 0 rgba(89,89,89,0.16)',
    menu: '0 0 2px 0 rgba(38,38,38,0.04), 0 4px 8px 0 rgba(89,89,89,0.16)',
    raised: '0 2px 4px 0 rgba(38,38,38,0.04), 0 8px 16px 0 rgba(89,89,89,0.16)',
    toast: '0 2px 8px 0 rgba(38,38,38,0.04), 0 16px 24px 0 rgba(89,89,89,0.16)',
    modal: '0 2px 8px 0 rgba(38,38,38,0.08), 0 20px 32px 0 rgba(89,89,89,0.24)',
};

const breakpoints = ['30em', '48em', '62em', '80em'];

// aliases
breakpoints['sm'] = breakpoints[0];
breakpoints['md'] = breakpoints[1];
breakpoints['lg'] = breakpoints[2];
breakpoints['xl'] = breakpoints[3];

const zIndices = {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
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

const theme = {
    breakpoints,
    zIndices,
    radii,
    opacity,
    borders,
    colors,
    ...typography,
    sizes,
    shadows,
    space,
    icons,

    // component styles
    // add to this in custom theme to override component styling
    styles: {},
};

export type ThemeType = typeof theme;

export default theme;
