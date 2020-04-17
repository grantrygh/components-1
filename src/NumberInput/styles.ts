import { useTheme } from '../ThemeProvider';

const numberInputStyle = ({ size, isDisabled }, theme) => ({
    style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: '1',
        transition: 'all 0.3s',
        tabindex: '-1',
        userSelect: 'none',
        pointerEvents: isDisabled ? 'none' : undefined,
        cursor: 'pointer',
        lineHeight: 'normal',
        borderLeft: '1px',
        borderColor: 'border',
        _active: {
            bg: 'track',
        },
        _first: {
            roundedTopRight: 'radius',
        },
        _last: {
            roundedBottomRight: 'radius',
            borderTopWidth: 1,
        },
        _disabled: {
            color: 'disabled',
            cursor: 'not-allowed',
        },
    },
    inputStepper: {
        direction: 'column',
        width: 'input.sm',
        margin: '1px',
        position: 'absolute',
        right: 0,
        height: 'calc(100% - 2px)',
        zIndex: 1,
    },
});

const useNumberInputStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].numberInput
        ? theme['styles'].numberInput(props, theme)
        : numberInputStyle(props, theme);

    return {
        // base style
        root: styles.style,
        inputStepper: styles.inputStepper,
    };
};

export default useNumberInputStyle;
