import { BoxProps } from '../Box/types';

export interface ITable {
    /**
     * The size of the switch
     */
    rows: Array<Object>;

    /**
     * table row renderer
     * use width to determine how to render rows
     */
    renderRow: (row: any) => React.ReactNode;

    /**
     * table header renderer
     * same as renderRow, but you should use Table.Th instead of Table.Td
     */
    renderHeader: () => React.ReactNode;

    // will render in the footer after rows are mapped, but before pagination
    afterRows?: any;

    // header will become sticky to top of table
    sticky?: boolean;

    // max height on table container will be set, and use auto scroll
    height?: number;

    /**
     * Do not wait for width to be measured
     * (this may flash mobile rows if you have any)
     * Safe to use if you only use one row layout
     */
    renderImmediately?: boolean;
}

export interface ITablePagination {
    /**
     * Graphql cursor
     * if passed and there are more than 1 pages, pagination will be shown
     */
    cursor?: {
        total: number;
        perPage: number;
        currentPage: number;
    };
    /**
     * Callback for pagination
     */
    onPageChange?: (page: number) => void;

    /**
     * content to be displayed next to pagination cursors
     */
    children?: React.ReactNode;

    loading?: boolean;
}

export interface ITableCell {
    // current sort data for table
    sorting?: {
        id: string;
        direction: 'asc' | 'desc';
    };

    // callback fired when cell header is clicked. leave null to disable sorting for that cell.
    onSort?: (args: { id: string; direction: 'asc' | 'desc' }) => void;

    // Passed to flex-grow
    span?: number;
}

export interface ITableRow {
    // any content to be shown upon un-collapsing the row. leave null to disable row collapsing
    expandedContent?: any;
}

export interface ITableContextProps {
    width?: number;
}

interface ITableProviderChild {
    width: number;
}
export interface ITableProviderProps {
    children: (args: ITableProviderChild) => React.ReactNode;
}

export type TableContextProps = ITableContextProps;
export type TableProviderProps = ITableProviderProps;
export type TableProps = ITable & ITablePagination;
export type TableRowProps = BoxProps & ITableRow & React.HTMLProps<HTMLTableRowElement>;
export type TableCellProps = BoxProps & ITableCell & React.HTMLProps<HTMLTableCellElement>;
export type TableHeadCellProps = BoxProps & React.HTMLProps<HTMLTableHeaderCellElement>;
export type TableFooterProps = BoxProps;
export type TableHeaderProps = BoxProps & ITableCell & { sticky?: boolean };
export type TablePaginationProps = ITablePagination;
