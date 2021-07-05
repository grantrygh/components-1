import { addOpacity } from '../theme';
import { useTheme } from '../ThemeProvider';

export const tableStyle = ({ height, sticky, sortable, span = 1 }, { colors }) => ({
    style: {
        color: 'bodyText',
        width: '100%',

        bg: 'tableBg',
    },
    container: {
        maxHeight: height,
        overflowY: height && 'auto',
        overflowX: 'auto',
        position: 'relative',
        borderColor: 'border',
        borderRadius: 'radius',
        borderWidth: '1px',
        _scrollbar: {
            width: '0.4em',
            height: '0.4em',
        },
        _thumb: {
            backgroundColor: colors.track,
        },
    },
    row: {
        display: 'table-row',
        width: '100%',
        position: 'relative',
        borderBottomWidth: '1px',
        borderColor: 'border',
    },
    expandedRow: {
        backgroundColor: colors.tableHeaderBg,
        boxShadow: 'inset 0 3px 6px -3px rgba(0, 0, 0, .2)',
        flex: 'unset',
        w: '100%',
    },
    cell: {
        flex: span,
        textAlign: 'left',
        p: 'spacing',
        d: 'table-cell',
        alignItems: 'center',
    },
    criticalActions: {
        position: 'sticky',
        right: 0,
        background: `linear-gradient(to right, ${addOpacity(colors.tableBg, 0.25)} 0%, ${colors.tableBg} 100%)`,
    },
    headerRow: {
        position: sticky && 'sticky',
        top: 0,
        bg: 'tableHeaderBg',
        zIndex: 'docked',
    },
    headerCell: {
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
        p: 'spacing',
        bg: 'tableHeaderBg',
    },
});

const useTableStyle = (props) => {
    const theme = useTheme();
    const styles = theme['styles'].table ? theme['styles'].table(props, theme) : tableStyle(props, theme);

    return {
        // base style
        table: styles.style,
        container: styles.container,
        row: styles.row,
        expandedRow: styles.expandedRow,
        cell: styles.cell,
        criticalActions: styles.criticalActions,
        headerCell: styles.headerCell,
        headerRow: styles.headerRow,
        header: styles.header,
        footer: styles.footer,
    };
};

export default useTableStyle;
