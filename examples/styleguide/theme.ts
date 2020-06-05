import { theme as defaultTheme, ThemeType } from '../../src';

export const styleguideTheme: ThemeType = {
    ...defaultTheme,
    colors: {
        // primary: generateShades('green'),
        // secondary: generateShades('green'),
        // titleText: neutral[1],
        // bodyText: neutral[6],
        // faintText: neutral[7],
        // tableHeadingBg: neutral[10],
        // disabled: neutral[8],
        // border: neutral[10], // and divider
        // // page layout
        // cardBg: neutral[11],
        // navBg: neutral[11],
        // popoverBg: neutral[10],
        // pageBg: neutral[12],
        // altBg: neutral[9],
        // canvasBg: neutral[13],
        // overlay: 'rgba(0,0,0,0.6)',
        // // component specific
        // track: neutral[8],
        // tooltip: neutral[9],
        // selectControlHover: neutral[9],
        // inputHover: neutral[3],
        // inputBg: neutral[2],
        // transparent: 'transparent',
        // current: 'currentColor',
        // // component specific
        // progress: primary[500],
        // button: primary, // VARIANT: primary button bg , secondary & tertiary button text - uses .500
        // buttonText: neutral[1], // primary button text
        // secondaryButton: 'transparent',
        // tertiaryButton: 'transparent',
        // activeLink: modes[mode].titleText,
        // inputFocus: primary[500],
    },
    fonts: { ...defaultTheme.fonts, heading: 'Poppins' },
    styles: {
        // override components
    },
};
