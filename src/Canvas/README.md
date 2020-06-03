## SPEC

1. CanvasWrapper should wrap all content. It consists of a CanvasContainer which provides context for panel states, and handles rendering of panels.
2. Include in the project's AppShell which wraps <Routes />
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

#### 2. Updating an existing panel at the route level

```jsx
const { updatePanel } = useCanvasContext();

updatePanel('filter', { isVisible: true, isMinified: true });
```
