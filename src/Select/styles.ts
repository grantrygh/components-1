import { useTheme } from '../ThemeProvider';

export const selectStyle = ({ disabled, size, border }, { colors, sizes, zIndices }) => ({
    style: {
        // !IMPORTANT: To override any component style, uncomment and add overrides below provided. some properties can be changed in the theme object below
        // clearIndicator: (provided, props) => ({
        //     ...provided,
        //     component overrides go here
        // }),
        container: (provided, props) => ({
            ...provided,
            width: '100%',
            minWidth: '10rem',
            opacity: disabled ? 0.4 : undefined,
        }),
        control: (provided, { isFocused }) => {
            const stateColor = colors.primary[500];
            return {
                ...provided,
                backgroundColor: colors.inputBg,
                boxShadow: 'none',
                borderWidth: border === 'full' && '1px',
                borderBottomWidth: border === 'underline' && '1px',
                borderColor: isFocused ? stateColor : colors.border,
                rounded: border === 'underline' && 0,
                '&:hover': { borderColor: stateColor },
            };
        },
        dropdownIndicator: (provided, props) => ({
            ...provided,
            height: 16,
            svg: {
                height: 16,
                width: 16,
            },
        }),
        // group: (provided, props) => ({
        //     ...provided,
        // }),
        // groupHeading: (provided, props) => ({
        //     ...provided,
        // }),
        indicatorsContainer: (provided, props) => ({
            ...provided,
            '> div': {
                padding: '0 8px',
            },
        }),
        indicatorSeparator: (provided, props) => ({
            // ...provided,
        }),
        // input: (provided, props) => ({
        //     ...provided,
        // }),
        // loadingIndicator: (provided, props) => ({
        //     ...provided,
        // }),
        // loadingMessage: (provided, props) => ({
        //     ...provided,
        // }),
        menu: (provided, props) => ({
            ...provided,
            backgroundColor: colors.popoverBg,
            color: colors.bodyText,
            zIndex: zIndices.dropdown,
        }),
        // menuList: (provided, props) => ({
        //     ...provided,
        // }),
        // menuPortal: (provided, props) => ({
        //     ...provided,
        // }),
        // multiValue: (provided, props) => ({
        //     ...provided,
        // }),
        // multiValueLabel: (provided, props) => ({
        //     ...provided,
        // }),
        // multiValueRemove: (provided, props) => ({
        //     ...provided,
        // }),
        // noOptionsMessage: (provided, props) => ({
        //     ...provided,
        // }),
        // option: (provided, props) => ({
        //     ...provided,
        // }),
        // placeholder: (provided, props) => ({
        //     ...provided,
        // }),
        singleValue: (provided, props) => ({
            ...provided,
            color: colors.bodyText,
        }),
        valueContainer: (provided, props) => ({
            ...provided,
            padding: border === 'underline' ? '1px 0' : '1px 8px',
        }),
    },
    theme: {
        root: {
            // borderRadius: 0,
        },
        colors: {
            danger: colors.error[500],
            dangerLight: colors.error[200],
            neutral0: colors.neutral[1],
            neutral5: colors.neutral[3],
            neutral10: colors.neutral[4],
            neutral20: colors.neutral[5], // border and dropdown indicator
            neutral30: colors.neutral[6],
            neutral40: colors.neutral[7],
            neutral50: colors.faintText,
            neutral60: colors.neutral[9],
            neutral70: colors.neutral[10],
            neutral80: colors.bodyText,
            neutral90: colors.neutral[12],
            primary: colors.primary[500],
            primary25: colors.selectControlHover,
            primary50: colors.primary[200],
            primary75: colors.primary[300],
        },
        spacing: {
            // baseUnit: 4,
            controlHeight: sizes.input[size],
            // menuGutter: 8,
        },
    },
});

const useSelectStyle = (props) => {
    const theme = useTheme();
    const styles = theme['styles'].select ? theme['styles'].select(props, theme) : selectStyle(props, theme);

    return {
        root: styles.style,
        theme: styles.theme,
    };
};

export default useSelectStyle;
