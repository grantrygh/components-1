import { useTheme } from '../ThemeProvider';

// TODO: revisit this
export const siteTourStyle = (props, theme) => ({
    content: {
        w: '100%',
        maxW: 'modal.sm',
    },
    body: {
        border: 0,
        p: 'spacing',
    },
    footer: {
        borderTop: 0,
        p: 'spacing',
    },
    popover: {
        color: 'bodyText',
        modifiers: {
            preventOverflow: { enabled: true, boundariesElement: 'viewport' },
        },
        borderWidth: 0,
        maxW: 'modal.sm',
        _focus: {
            outline: 0,
        },
        zIndex: 'popover',
    },
});

const useSiteTourStyle = (props) => {
    const theme = useTheme();
    const styles = theme['styles'].siteTour ? theme['styles'].siteTour(props, theme) : siteTourStyle(props, theme);

    return {
        contentStyles: styles.control,
        bodyStyles: styles.body,
        footerStyles: styles.footer,
        popoverStyles: styles.popover,
    };
};

export default useSiteTourStyle;
