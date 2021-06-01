import { useTheme } from '../ThemeProvider';

export const tableStyle = ({ height, sticky, sortable, expandedContent, span = 1 }, { colors }) => ({
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
        _scrollbar: {
            width: '0.4em',
            height: '0.4em',
        },
        _thumb: {
            backgroundColor: colors.track,
        },
    },
    row: {
        display: 'flex',
        width: '100%',
        position: 'relative',
        borderBottomWidth: expandedContent ? 0 : '5px',
        borderColor: 'border',
    },
    expandedRow: {
        backgroundColor: colors.tableHeaderBg,
        boxShadow: 'inset 0 3px 6px -3px rgba(0, 0, 0, .2)',
    },
    cell: {
        flex: span,
        textAlign: 'left',
        p: 4,
        display: 'inline-flex',
        alignItems: 'center',
    },
    headerRow: {
        position: sticky && 'sticky',
        top: 0,
        bg: 'tableHeaderBg',
        zIndex: 'docked',
    },
    headerCell: {
        display: 'inline-flex',
        alignItems: 'center',
        position: 'relative',
        cursor: sortable && 'pointer',
    },
    header: {
        color: 'titleText',
        bg: 'tableHeaderBg',
        fontWeight: 'semibold',
    },
    footer: {
        p: 4,
        bg: 'tableHeaderBg',
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
        expandedRow: styles.expandedRow,
        cell: styles.cell,
        headerCell: styles.headerCell,
        headerRow: styles.headerRow,
        header: styles.header,
        footer: styles.footer,
    };
};

export default useTableStyle;
