### Resources

**Spec / Planning doc**

https://docs.google.com/document/d/1Ouq6UIUeEy9MNb__dRPS2Gur_73rtaYbEXcdZD0cyyY/edit#heading=h.2k18qvnpjtn5

**Coding standard**

https://docs.google.com/document/d/1MyEwOv-cMLiPwGB7xACWe1BrcrPf4kJYwmCyy1Xjuz0/edit

**JS resources**

https://docs.google.com/document/d/1-Hx6xVAyWfU5cdJ5T3hrOgk1Xq8pmpGlq-2JNDiV3HI/edit

## Theming

#### 1. Creating the theme object

Things to note:

1. Any key in the default theme can be overridden, and the default theme can be imported to be extended.
2. Colors will be merged in by default, and therefore does not require extending the default themehouse.
3. Brand colors, as well as a few others, are objects that contain multiple shades of the base color. When passing a new brand color, they must be sent within the generateShades() function.
4. For more control of the theme, individual components can also be re-styled.

```jsx
import { generateShades, theme as defaultTheme, ThemeType } from '@audentio/stuff/theme';

export const theme: ThemeType = {
    ...defaultTheme,
    colors: {
        // Brand colors
        // primary: generateShades('green'),
        // secondary: generateShades('green'),
        // Typography
        // titleText: neutral[1],
        // bodyText: neutral[6],
        // faintText: neutral[7],
        // disabled: neutral[8],
        // Page layout
        // cardBg: neutral[11],
        // navBg: neutral[11],
        // popoverBg: neutral[10],
        // pageBg: neutral[12],
        // altBg: neutral[9],
        // canvasBg: neutral[13],
        // border: neutral[10], // and divider
        // overlay: 'rgba(0,0,0,0.6)',
        // Component-specific
        // button: primary, // primary button bg. secondary & tertiary button text - uses .500
        // buttonText: neutral[1], // primary button text
        // secondaryButton: 'transparent',
        // tertiaryButton: 'transparent',
        // tableHeadingBg: neutral[10],
        // track: neutral[8],
        // tooltip: neutral[9],
        // selectControlHover: neutral[9],
        // inputHover: neutral[3],
        // inputFocus: primary[500],
        // inputBg: neutral[2],
        // progress: primary[500],
        // activeLink: modes[mode].titleText,
        // overlayBg: 'rgba(0, 0, 0, 0.2)',
    },
    fonts: { ...defaultTheme.fonts, heading: 'Poppins' },
    styles: {
        // override component styles here
    },
};
```

#### 2. Using the theme object

Wrap your project in the ThemeProvider HOC and pass in your newly created theme object.

````jsx
import { ThemeProvider } from '@audentio/stuff/ThemeProvider';

<ThemeProvider theme={theme}>
        <AppShell {...props} />
    </ThemeProvider>
    ```
````

#### 3. (Optional) Overriding a component's style

This allows finer control over how components are styled. Within the styles key of the theme object, add each component. Component's default's styles can be imported if not all styles need to be changed.

For example, to change the style of `<AvatarGroup />`.

```jsx
import { avatarGroupStyle } from '@audentio/stuff/AvatarGroup/styles';
export const theme: ThemeType = {
    colors: {
        // ...
    },
    styles: {
        // override component styles here
        avatarGroup: ({ color, size }, theme) => ({
            style: {
                ...avatarGroupStyle
                borderColor: '#000',
                bg: 'blue.200',
                borderWidth: '1px',
            },
        }),
    },
};
```
