import { theme as defaultTheme, ThemeType } from '../../src';

export const styleguideTheme: ThemeType = {
    ...defaultTheme,
    colors: {
        // dark: {
        //     primary: generateShades('#35BDE4'),
        //     tableHeadingBg: '#24252A',
        //     border: 'rgba(255,255,255,0.12)',
        //     cardBg: '#36383F',
        //     navBg: '#36383F',
        //     pageBg: '#2E3036',
        //     canvasBg: '#24252A',
        //     buttonText: '#2E3036', // primary button text
        // },
        // light: {
        //     primary: generateShades('indigo'),
        // },
    },
    fonts: { ...defaultTheme.fonts, heading: 'Poppins' },
    styles: {
        // button: (props, theme) => {
        //     console.log('buttonstyle', props, theme, buttonStyle(props, theme));
        //     const btnStyle = buttonStyle(props, theme);
        //     return {
        //         ...btnStyle,
        //         style: {
        //             ...btnStyle.style,
        //             textTransform: 'uppercase',
        //         },
        //     };
        // },
        // override components
    },
};
