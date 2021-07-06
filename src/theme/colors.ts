/* eslint-disable max-lines */

import { generateShades } from './colors-utils';
import { Colors } from './types';

// brand colors
// use https://material.io/resources/color
const brand = {
    primary: generateShades('#0069FF'),
    secondary: generateShades('#3DD598'),
};

const neutralScheme = {
    1: '#FFFFFF',
    2: '#FAFAFA',
    3: '#F5F5F5',
    4: '#F0F0F0',
    5: '#D9D9D9',
    6: '#BFBFBF',
    7: '#8C8C8C',
    8: '#595959',
    9: '#434343',
    10: '#262626',
    11: '#1F1F1F',
    12: '#141414',
    13: '#000000',
};

const states = {
    success: generateShades('#3DD598'),
    info: generateShades('#50B5FF'),
    warning: generateShades('#FFC542'),
    error: generateShades('#FC5A5A'),
};

const palette = {
    whiteAlpha: {
        50: 'rgba(255, 255, 255, 0.04)',
        100: 'rgba(255, 255, 255, 0.06)',
        200: 'rgba(255, 255, 255, 0.08)',
        300: 'rgba(255, 255, 255, 0.16)',
        400: 'rgba(255, 255, 255, 0.24)',
        500: 'rgba(255, 255, 255, 0.36)',
        600: 'rgba(255, 255, 255, 0.48)',
        700: 'rgba(255, 255, 255, 0.64)',
        800: 'rgba(255, 255, 255, 0.80)',
        900: 'rgba(255, 255, 255, 0.92)',
    },

    blackAlpha: {
        50: 'rgba(0, 0, 0, 0.04)',
        100: 'rgba(0, 0, 0, 0.06)',
        200: 'rgba(0, 0, 0, 0.08)',
        300: 'rgba(0, 0, 0, 0.16)',
        400: 'rgba(0, 0, 0, 0.24)',
        500: 'rgba(0, 0, 0, 0.36)',
        600: 'rgba(0, 0, 0, 0.48)',
        700: 'rgba(0, 0, 0, 0.64)',
        800: 'rgba(0, 0, 0, 0.80)',
        900: 'rgba(0, 0, 0, 0.92)',
    },

    gray: {
        50: '#F7FAFC',
        100: '#EDF2F7',
        200: '#E2E8F0',
        300: '#CBD5E0',
        400: '#A0AEC0',
        500: '#718096',
        600: '#4A5568',
        700: '#2D3748',
        800: '#1A202C',
        900: '#171923',
    },

    red: {
        50: '#fff5f5',
        100: '#fed7d7',
        200: '#feb2b2',
        300: '#fc8181',
        400: '#f56565',
        500: '#e53e3e',
        600: '#c53030',
        700: '#9b2c2c',
        800: '#822727',
        900: '#63171b',
    },

    orange: {
        50: '#FFFAF0',
        100: '#FEEBC8',
        200: '#FBD38D',
        300: '#F6AD55',
        400: '#ED8936',
        500: '#DD6B20',
        600: '#C05621',
        700: '#9C4221',
        800: '#7B341E',
        900: '#652B19',
    },

    yellow: {
        50: '#fffff0',
        100: '#fefcbf',
        200: '#faf089',
        300: '#f6e05e',
        400: '#ecc94b',
        500: '#d69e2e',
        600: '#b7791f',
        700: '#975a16',
        800: '#744210',
        900: '#5F370E',
    },

    green: {
        50: '#f0fff4',
        100: '#c6f6d5',
        200: '#9ae6b4',
        300: '#68d391',
        400: '#48bb78',
        500: '#38a169',
        600: '#2f855a',
        700: '#276749',
        800: '#22543d',
        900: '#1C4532',
    },

    teal: {
        50: '#E6FFFA',
        100: '#B2F5EA',
        200: '#81E6D9',
        300: '#4FD1C5',
        400: '#38B2AC',
        500: '#319795',
        600: '#2C7A7B',
        700: '#285E61',
        800: '#234E52',
        900: '#1D4044',
    },

    blue: {
        50: '#ebf8ff',
        100: '#ceedff',
        200: '#90cdf4',
        300: '#63b3ed',
        400: '#4299e1',
        500: '#3182ce',
        600: '#2a69ac',
        700: '#1e4e8c',
        800: '#153e75',
        900: '#1a365d',
    },

    cyan: {
        50: '#EDFDFD',
        100: '#C4F1F9',
        200: '#9DECF9',
        300: '#76E4F7',
        400: '#0BC5EA',
        500: '#00B5D8',
        600: '#00A3C4',
        700: '#0987A0',
        800: '#086F83',
        900: '#065666',
    },

    purple: {
        50: '#faf5ff',
        100: '#e9d8fd',
        200: '#d6bcfa',
        300: '#b794f4',
        400: '#9f7aea',
        500: '#805ad5',
        600: '#6b46c1',
        700: '#553c9a',
        800: '#44337a',
        900: '#322659',
    },

    pink: {
        50: '#fff5f7',
        100: '#fed7e2',
        200: '#fbb6ce',
        300: '#f687b3',
        400: '#ed64a6',
        500: '#d53f8c',
        600: '#b83280',
        700: '#97266d',
        800: '#702459',
        900: '#521B41',
    },
};

const colors = (providedTheme, mode) => {
    const providedColors = providedTheme?.colors as Colors;
    const primary = (providedColors && providedColors[mode]?.primary) || brand.primary;
    const secondary = (providedColors && providedColors[mode]?.secondary) || brand.secondary;
    // A large number of components use {color}.500 to support palette colors
    // To support better dark theme contrast value, regenerate brand colors based on a lighter shade - .300 will become the new .500
    // TODO: could be an issue with this if using dark theme as the base mode, and wanting to use the passed primary.500 value
    // const colorVariant = mode === 'light' ? 500 : 300;
    // if (mode === 'dark') {
    //     primary = generateShades(primary[colorVariant]);
    //     secondary = generateShades(secondary[colorVariant]);
    // }
    const neutral = (providedColors && providedColors[mode]?.neutral) || neutralScheme;

    const modes = {
        light: {
            titleText: neutral[12],
            bodyText: neutral[9],
            faintText: neutral[7],
            tableHeaderBg: neutral[2],
            disabled: neutral[5],
            border: neutral[4], // and divider

            // page layout
            cardBg: neutral[1],
            navBg: neutral[2],
            tableBg: neutral[1],
            popoverBg: neutral[2],
            pageBg: neutral[3],
            altBg: neutral[3],
            canvasBg: neutral[4],
            overlay: 'rgba(0,0,0,0.4)',

            // component specific
            track: neutral[5],
            thumb: neutral[6],
            tooltip: neutral[2],
            selectControlHover: primary[50],

            inputHover: neutral[3],
            inputBg: neutral[2],
        },
        dark: {
            titleText: neutral[1],
            bodyText: neutral[6],
            faintText: neutral[7],
            tableHeaderBg: neutral[10],
            disabled: neutral[8],
            border: neutral[10],

            // page layout
            cardBg: neutral[11],
            navBg: neutral[11],
            tableBg: neutral[11],
            popoverBg: neutral[10],
            pageBg: neutral[12],
            altBg: neutral[9],
            canvasBg: neutral[13],
            overlay: 'rgba(0,0,0,0.6)',

            // component specific
            track: neutral[8],
            thumb: neutral[7],
            tooltip: neutral[9],
            selectControlHover: neutral[9],

            inputHover: neutral[8],
            inputBg: neutral[9],
        },
    };

    return {
        transparent: 'transparent',
        current: 'currentColor',

        ...palette,
        ...states,

        primary,
        secondary,

        // Neutral Scale Design Colors
        neutral,

        // Theme-type specific
        ...modes[mode],

        black: neutral[13],
        white: neutral[1],

        // component specific
        progress: primary[500],

        button: primary,
        buttonText: neutral[1],
        secondaryButton: 'transparent',
        tertiaryButton: 'transparent',
        activeLink: primary[500],

        inputFocus: primary[500],

        linkedin: {
            50: '#E8F4F9',
            100: '#CFEDFB',
            200: '#9BDAF3',
            300: '#68C7EC',
            400: '#34B3E4',
            500: '#00A0DC',
            600: '#008CC9',
            700: '#0077B5',
            800: '#005E93',
            900: '#004471',
        },

        facebook: {
            50: '#E8F4F9',
            100: '#D9DEE9',
            200: '#B7C2DA',
            300: '#6482C0',
            400: '#4267B2',
            500: '#385898',
            600: '#314E89',
            700: '#29487D',
            800: '#223B67',
            900: '#1E355B',
        },

        messenger: {
            50: '#D0E6FF',
            100: '#B9DAFF',
            200: '#A2CDFF',
            300: '#7AB8FF',
            400: '#2E90FF',
            500: '#0078FF',
            600: '#0063D1',
            700: '#0052AC',
            800: '#003C7E',
            900: '#002C5C',
        },

        whatsapp: {
            50: '#e2f7f4',
            100: '#c3f0e9',
            200: '#a0e7dc',
            300: '#76dccd',
            400: '#43cfba',
            500: '#00BFA5',
            600: '#00ac92',
            700: '#009780',
            800: '#007d6a',
            900: '#005a4c',
        },

        twitter: {
            50: '#e5f4fd',
            100: '#c8e9fb',
            200: '#a8dcfa',
            300: '#83cdf7',
            400: '#57bbf5',
            500: '#1DA1F2',
            600: '#1a94da',
            700: '#1681bf',
            800: '#136b9e',
            900: '#0d4d71',
        },

        telegram: {
            50: '#e3f2f9',
            100: '#c5e4f3',
            200: '#a2d4ec',
            300: '#7ac1e4',
            400: '#47a9da',
            500: '#0088CC',
            600: '#007ab8',
            700: '#006ba1',
            800: '#005885',
            900: '#003f5e',
        },

        ...((providedColors && providedColors[mode] ? providedColors[mode] : providedColors) || {}),
    };
};

export default colors;
