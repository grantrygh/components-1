import { useTheme } from '../ThemeProvider';

export const tableStyle = ({ height, sticky, sortable }, theme) => ({
    style: {
        color: 'bodyText',
        width: '100%',
        borderColor: 'border',
        borderRadius: 'radius',
        borderWidth: '1px',
        bg: 'cardBg',
    },
    container: {
        maxHeight: height,
        overflowY: height && 'auto',
        overflowX: 'hidden',
        position: 'relative',
    },
    row: {
        display: 'flex',
    },
    cell: {
        flex: 1,
        textAlign: 'left',
        p: 4,
        borderBottom: '1px',
        borderColor: 'border',
    },
    headerRow: {
        position: sticky && 'sticky',
        top: 0,
        bg: 'tableHeadingBg',
        zIndex: 'docked',
    },
    headerCell: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        cursor: sortable && 'pointer',
    },
    header: {
        color: 'titleText',
        bg: 'tableHeadingBg',
        fontWeight: 'semibold',
    },
    footer: {
        p: 4,
        bg: 'tableHeadingBg',
    },
});

const useTableStyle = props => {
    const theme = useTheme();
    const styles = theme['styles'].table ? theme['styles'].table(props, theme) : tableStyle(props, theme);

    return {
        // base style
        table: styles.style,
        container: styles.container,
        row: styles.row,
        cell: styles.cell,
        headerCell: styles.headerCell,
        headerRow: styles.headerRow,
        header: styles.header,
        footer: styles.footer,
    };
};

export default useTableStyle;
