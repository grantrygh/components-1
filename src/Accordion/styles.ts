import { useTheme } from '../ThemeProvider';

export const accordionStyle = ({ isDisabled, isExpanded }, theme) => ({
    style: {
        //
    },
    item: {
        borderTopWidth: '1px',
        _last: { borderBottomWidth: '1px' },
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        transition: 'all 0.2s',
        _focus: { boxShadow: 'outline' },
        _hover: { bg: 'blackAlpha.50' },
        _disabled: { opacity: '0.4', cursor: 'not-allowed' },
        outline: '0',
        px: 4,
        py: 2,
    },
    panel: {
        pt: 2,
        px: 4,
        pb: 5,
    },
    icon: {
        size: '1.25em',
        name: 'chevron-down',
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
