import { useTheme } from '../ThemeProvider';

export const accordionStyle = ({ isDisabled, isExpanded }, theme) => ({
    style: {
        width: '100%',
    },
    item: {
        //
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
        py: 'spacing',
        transition: 'all 0.2s',
        borderBottom: '1px',
        borderColor: 'border',
        _focus: { boxShadow: 'outline' },
        // _hover: { bg: 'blackAlpha.50' },
        _disabled: { opacity: '0.4', cursor: 'not-allowed' },
        outline: '0',
        flex: 1,
    },
    panel: {
        p: 'spacing',
    },
    icon: {
        position: 'absolute',
        right: 0,
        opacity: isDisabled ? 0.4 : 1,
        transform: isExpanded ? 'rotate(-180deg)' : null,
        transition: 'transform 0.2s',
        transformOrigin: 'center',
    },
});

const useAccordionStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].accordion ? theme['styles'].accordion(props, theme) : accordionStyle(props, theme);

    return {
        root: styles.style,
        item: styles.item,
        header: styles.header,
        panel: styles.panel,
        icon: styles.icon,
    };
};

export default useAccordionStyle;
