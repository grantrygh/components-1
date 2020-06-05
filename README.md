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
2. Colors will be merged in by default, and therefore does not require extending the default theme.
3. Brand colors, as well as a few others, are objects that contain multiple shades of the base color. When passing a new brand color, they must be sent within the generateShades() function.
4. For more control of the theme, individual components can also be re-styled.

```jsx
import { generateShades, theme as defaultTheme, ThemeType } from '@audentio/stuff/theme';

export const theme: ThemeType = {
    ...defaultTheme,
    colors: {
        //  color overrides - see below
    },
    fonts: {
        ...defaultTheme.fonts,
        //  heading: 'Poppins',
    },
    styles: {
        // override component styles here
    },
};
```

List of theme color variables to override:

-   Brand colors : use generateShades(color)
    -   `primary` - main brand color
    -   `secondary` - complementary brand color
-   Typography
    -   `titleText` - used for headings
    -   `bodyText` - default color for text
    -   `faintText` - used for subtle text
    -   `disabled` - disabled inputs, buttons, etc
-   Page layout
    -   `cardBg` - card background,
    -   `navBg` - navigation header background
    -   `popoverBg` - popover menu background
    -   `pageBg` - "main" canvas page background
    -   `altBg` - used for alternating sections, table rows, etc, background
    -   `canvasBg` - canvas background,
    -   `border` - used for borders and dividers
    -   `overlay` - used along with modals, overlay canvases
-   Components
    -   `button` - used for primary button background, as well as secondary & tertiary button text color
    -   `buttonText` - used for primary button text
    -   `secondaryButton` - secondary button (shadowed) background. defaults to transparent
    -   `tertiaryButton` - tertiary button (outlined) background. defaults to transparent
    -   `tableHeadingBg` - used for table header and footer backgrounds
    -   `track` - background for slider, switches, progress ocmponents
    -   `tooltip` - tooltip background
    -   `selectControlHover` - background for a hovered menu item within the select menu
    -   `inputHover` - input background when hovered
    -   `inputFocus` - input border color when focused
    -   `inputBg` - 'filled' variant input background
    -   `progress` - default background for progress component indicator
    -   `activeLink` - color when a link is active

#### 2. Using the theme object

Wrap your project in the ThemeProvider HOC and pass in your newly created theme object.

```jsx
import { ThemeProvider } from '@audentio/stuff/ThemeProvider';

return (
    <ThemeProvider theme={theme}>
        <AppShell {...props} />
    </ThemeProvider>
);
```

#### 3. (Optional) Overriding a component's style

This allows finer control over how components are styled. Within the styles key of the theme object, add each component. Component's default's styles can be imported if not all styles need to be changed.

For example, to change the style of `<AvatarGroup />`.

```jsx
import { avatarGroupStyle } from '@audentio/stuff/AvatarGroup/styles';
export const theme: ThemeType = {
    colors: {
        //  ...
    },
    styles: {
        //  override component styles
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
