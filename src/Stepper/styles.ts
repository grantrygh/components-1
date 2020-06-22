import { addOpacity } from '../theme';
import { useTheme } from '../ThemeProvider';

export const stepperStyle = (
    { isCompleted, isActive, size, spacing = 8, buttonSize },
    { colors, space: themeSpacing }
) => {
    const offset = 2;

    return {
        style: {
            root: {
                //
            },
            orientation: {
                vertical: {
                    direction: 'column',
                    justify: 'center',
                },
                horizontal: {
                    align: 'center',
                },
            },
        },
        outer: {
            root: {
                display: 'flex',
                position: 'relative',
            },
            orientation: {
                horizontal: {
                    justifyContent: 'center',
                    flexDirection: 'column',
                    mr: spacing,
                },
                vertical: {
                    alignItems: 'center',
                    flexDirection: 'row',
                },
            },
        },
        item: {
            variant: isCompleted ? 'primary' : 'tertiary',
            variantColor: 'secondary',
            h: buttonSize,
            minW: buttonSize,
            w: buttonSize,
            border: '2px',
            ...(!isCompleted && {
                borderColor: '#42454E',
            }),
            ...(isActive && {
                bg: 'white',
                borderColor: 'white',
            }),
        },
        divider: {
            base: {
                background: isCompleted
                    ? `linear-gradient(to bottom, ${colors.success[500]} 75%, ${addOpacity(
                          colors.success[500],
                          0.5
                      )} 100%)`
                    : colors.border,
                border: 0,
            },
            orientation: {
                horizontal: {
                    height: `${size}px`,
                    width: `calc(100% + ${themeSpacing.spacing})`,
                    position: 'absolute',
                    top: 0,
                    left: buttonSize,
                    mt: `calc(${buttonSize / 8}rem - ${size / 2}px)`,
                },
                vertical: {
                    width: `${size}px`,
                    height: `${spacing + offset}`,
                    my: -(offset / 2),
                    ml: `calc(${buttonSize / 8}rem - ${size / 2}px)`,
                },
            },
        },
    };
};

const useStepperStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].stepper ? theme['styles'].stepper(props, theme) : stepperStyle(props, theme);

    return {
        root: {
            ...styles.style.root,
            ...styles.style.orientation[props.orientation],
        },
        item: styles.item,
        outer: {
            ...styles.outer.root,
            ...styles.outer.orientation[props.orientation],
        },
        divider: {
            ...styles.divider.base,
            ...styles.divider.orientation[props.orientation],
        },
    };
};

export default useStepperStyle;
