import { useTheme } from '../ThemeProvider';

export const tableStyle = ({ height, sticky, sortable, expandedContent }, theme) => ({
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
        overflowX: 'auto',
        position: 'relative',
    },
    row: {
        display: 'flex',
        width: '100%',
        position: 'relative',
        borderBottomWidth: expandedContent ? 0 : '1px',
        borderColor: 'border',
    },
    cell: {
        flex: 1,
        textAlign: 'left',
        p: 4,
        display: 'inline-flex',
        alignItems: 'center',
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
