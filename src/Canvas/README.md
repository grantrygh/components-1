## Spec

1. CanvasWrapper should wrap all content. It consists of a CanvasContainer which provides context for panel states, and handles rendering of panels.
2. Include in the project's AppShell which wraps all Routes.
3. Takes in an initialCanvasState props which should contain (at minimum) the main panel content.

## Usage

#### 1. Initialization

Any global panels can be passed in to the CanvasWrapper upon initialization, such as the main panel and navigation menu.
It is required that the main panel be name "main".

```jsx
export const AppShell = props => {
    const { children } = props;
    const { breakpoints } = useTheme();

    const initialCanvasState = {
        menu: {
            name: 'menu',
            position: 'left',
            ranges: {
                defaultVisible: [breakpoints.stripped.md, 9999],
                isOverlay: [0, breakpoints.stripped.md],
                allowMinify: [breakpoints.stripped.md, 9999],
                defaultMinified: [breakpoints.stripped.md, breakpoints.stripped.lg],
            },
            render: componentProps => <CanvasMenu as="nav" items={menuItems} {...componentProps} />,
            bg: 'canvasBg',
        },
        main: {
            name: 'main', // Main section is always visible, inline, and non-minifiable
            render: componentProps => {
                return (
                    <>
                        {/* Header */}
                        <Navigation>
                            <NavPrimary />
                            <NavSecondary />
                            <NavTertiary />
                        </Navigation>

                        <Flex direction="column" overflowY="auto" h="100%">
                            {/* Main */}
                            {componentProps.children}

                            {/* Footer */}
                            <PageFooter>Footer</PageFooter>
                        </Flex>
                    </>
                );
            },
            bg: 'pageBg',
        },
    };

    return <CanvasWrapper initialCanvasState={initialCanvasState}>{children}</CanvasWrapper>;
};
```

#### 2. Adding a new panel at the route level

Set the new panel inside a useEffect hook in the Route to avoid being called on re-renders.

```jsx
const { togglePanel, setPanel } = useCanvasContext();

useEffect(() => {
    setPanel('filter', () => ({
        name: 'filter',
        position: 'left',
        ranges: {
            isOverlay: [0, 1024],
            allowMinify: false,
            defaultVisible: [0, 9999],
            defaultMinified: false,
        },
        render: componentProps => <FilterMenuForm onSubmit={val => setFormValue(val)} />,
        bg: 'navBg',
    }));
}, []);
```

#### 3. Updating an existing panel at the route level

```jsx
const { updatePanel } = useCanvasContext();

updatePanel('filter', { isVisible: true, isMinified: true });
```

## Panel Props

When setting the panel through initialCanvasState or setPanel(), there are a few canvas specific props that can be passed

-   `name` - Required. Unique name used for setting and updating panels.
-   `position` - Optional. Pass 'left' or 'right' to define where the panel shows as an inline or overlay panel.
-   `render` - Required. Function that gets called to render the panel's contents.
-   `ranges` - Required. Object that contains the following item breakpoint ranges, used for setting display properties.

    -   `defaultVisible` - If within range, panel will render as visible
    -   `isOverlay` - If within range, panel will render as an overlay. Otherwise will display inline.
    -   `allowMinify` - Sets the range in which the panel can be minified.
    -   `defaultMinified` - If within this range and the allowMinify range, panel will render as minfied, rather than full;

    These breakpoint ranges should be in the form [min, max] as numbers. Boolean 'false' can also be passed instead to always disable the property (for instance, to never allow a canvas to be minfied, or never show as an overlay). Alternatively, a range of [0, 9999] can be used to always be set as true.

```

```
