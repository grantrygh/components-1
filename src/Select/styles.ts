import { useTheme } from '../ThemeProvider';

export const selectStyle = (selectProps, theme) => ({
    style: {
        // !IMPORTANT: To override any component style, uncomment and add overrides below provided. some properties can be changed in the theme object below
        // clearIndicator: (provided, props) => ({
        //     ...provided,
        //     component overrides go here
        // }),
        // container: (provided, props) => ({
        //     ...provided,
        // }),
        control: (provided, { isFocused }) => {
            const stateColor = theme.colors.primary[500];
            return {
                ...provided,
                boxShadow: 'none',
                borderWidth: 0,
                borderBottomWidth: '1px',
                borderColor: isFocused ? stateColor : theme.colors.border,
                '&:hover': { borderColor: stateColor },
            };
        },
        // dropdownIndicator: (provided, props) => ({
        //     ...provided,
        // }),
        // group: (provided, props) => ({
        //     ...provided,
        // }),
        // groupHeading: (provided, props) => ({
        //     ...provided,
        // }),
        // indicatorsContainer: (provided, props) => ({
        //     ...provided,
        // }),
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
        // menu: (provided, props) => ({
        //     ...provided,
        // }),
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
        // singleValue: (provided, props) => ({
        //     ...provided,
        // }),
        // valueContainer: (provided, props) => ({
        //     ...provided,
        // }),
    },
    theme: {
        root: {
            // borderRadius: theme.radii.radius,
        },
        colors: {
            danger: theme.colors.error[500],
            dangerLight: theme.colors.error[200],
            neutral0: theme.colors.neutral[1],
            neutral5: theme.colors.neutral[3],
            neutral10: theme.colors.neutral[4],
            neutral20: theme.colors.neutral[5], // border and dropdown indicator
            neutral30: theme.colors.neutral[6],
            neutral40: theme.colors.neutral[7],
            neutral50: theme.colors.neutral[8],
            neutral60: theme.colors.neutral[9],
            neutral70: theme.colors.neutral[10],
            neutral80: theme.colors.neutral[11],
            neutral90: theme.colors.neutral[12],
            primary: theme.colors.primary[500],
            primary25: theme.colors.primary[50],
            primary50: theme.colors.primary[200],
            primary75: theme.colors.primary[300],
        },
        spacing: {
            // baseUnit: 4,
            // controlHeight: 38,
            // menuGutter: 8
        },
    },
});

const useSelectStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].select ? theme['styles'].select(props, theme) : selectStyle(props, theme);

    return {
        root: styles.style,
        theme: styles.theme,
    };
};

export default useSelectStyle;
