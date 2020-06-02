import { BoxProps } from 'Box/types';

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
     * Callback for user modification of perPage
     */
    onPerPageChange?: (perPage: number) => void;

    loading?: boolean;
}

export interface ITableCell {
    sorting?: {
        id: string;
        direction: 'asc' | 'desc';
    };
    onSort?: (args: { id: string; direction: 'asc' | 'desc' }) => void;
}

export interface ITableRow {
    asComponent?: any;
    expandedContent?: any;
}

export type TableProps = ITable & ITablePagination;
export type TableRowProps = BoxProps & ITableRow & React.HTMLProps<HTMLTableRowElement>;
export type TableCellProps = BoxProps & ITableCell & React.HTMLProps<HTMLTableCellElement>;
export type TableHeadCellProps = BoxProps & React.HTMLProps<HTMLTableHeaderCellElement>;
export type TableFooterProps = BoxProps;
export type TableHeaderProps = BoxProps & ITableCell & { sticky?: boolean };
export type TablePaginationProps = ITablePagination;
