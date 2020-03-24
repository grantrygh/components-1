# WIP

### modules

-   Rename .js files to .ts
-   Rename .js files with JSX inside them to .tsx
-   Create <ComponentName>.types.ts to keep type information (replacing index.d.ts)
    -   requires some refactor to use types directly in the tsx file. we'll generate .d.ts files for consumption at build

### Components/theming

-   Switch to named exports
-   remove dark/light modes. we'll use theme for those
-   use <brand.color.level> if a component needs to use brand color (e.g. bg: 'primary.400')
-   make sure component is a styled instance [unconfirmed]
    -   to allow referencing as nested selector for dynamic hover styling and such

---

### Compare

**JS way**

```tsx
import { Button } from '@audentio/stuff';

const heroStlyes = {
    m: 1,
    mt: 3,
    p: 2,
    size: 32,
    color: 'blue.200',
};

if (Math.random() > 0.4) {
    heroStlyes.size = 30;
}

const MyCustomBox = (
    <Box {...heroStyles} pl={3}>
        <Button>CTA</Button>
    </Box>
);
```

**CSS way**

```tsx
const isSmall = Math.random() > 0.4;

const StyledCustomBox = styled(Box)`
    margin: ${props => props.theme.gutter}px;
    margin-top: ${props => props.theme.gutter * 3}px;
    padding: ${props => props.theme.gutter * 2}px;
    height: ${props => (isSmall ? '30px' : '32px')};
    width: ${props => (isSmall ? '30px' : '32px')};
    color: ${props => props.theme.colors.blue[200]};
`;

const MyCustomBox = () => {
    const theme = useTheme();

    return (
        <StyledCustomBox style={{ paddingLeft: theme.gutter * 3 }}>
            <Button>CTA</Button>
        </StyledCustomBox>
    );
};
```
