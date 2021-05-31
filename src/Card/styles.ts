import { useTheme } from '../ThemeProvider';

export const cardStyle = ({ raised }, theme) => ({
    style: {
        borderColor: 'border',
        shadow: raised ? 'raised' : 'card',
        rounded: 'radius',
        p: ['spacing-sm', 'spacing'],
        // overflow: 'hidden',
        bg: 'cardBg',
    },
});

const useCardStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].card ? theme['styles'].card(props, theme) : cardStyle(props, theme);

    return {
        ...styles.style,
    };
};

export default useCardStyle;
