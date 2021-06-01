import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Box } from '../Box';
import { PseudoBox } from '../PseudoBox';
import { TablePagination } from './components/TablePagination';
import useTableStyle from './styles';
import { TableContextProps, TableProps, TableProviderProps } from './types';

const TableContext = createContext<TableContextProps>({});
export const useTableContext = () => {
    const context = useContext(TableContext);
    if (context == null) {
        throw new Error('This component must be used within the `TableProvider` ');
    }
    return context;
};

export const TableProvider = React.forwardRef((props: TableProviderProps, ref) => {
    const tableRef = useRef<HTMLDivElement>(null);
    const tableRefWidth = tableRef && tableRef.current?.getBoundingClientRect()?.width;
    const [tableWidth, setTableWidth] = useState(tableRefWidth);

    useEffect(() => {
        setTableWidth(tableRefWidth);
    }, [tableRefWidth]);

    return (
        <TableContext.Provider value={{ width: tableWidth }}>
            <Box ref={tableRef}>
                {props.children({
                    width: tableWidth,
                })}
            </Box>
        </TableContext.Provider>
    );
});

export const Table = (props: TableProps, ref) => {
    const {
        rows,
        renderRow,
        renderHeader,
        afterRows,
        loading,
        onPageChange,
        cursor,
        height,
        renderImmediately = true,
    } = props;

    const tableContext = useTableContext();
    const width = tableContext?.width;

    const { table: tableStyleProps, container: containerStyleProps, footer: footerStyleProps } = useTableStyle({
        height,
    });

    if (!width && typeof window !== 'undefined' && !renderImmediately) {
        return null;
    }

    if (rows.constructor !== Array) {
        throw new Error('Table rows must be array type');
    }

    const header: any = renderHeader();

    return (
        <PseudoBox {...containerStyleProps}>
            <Box as="table" {...tableStyleProps}>
                {header}

                <Box as="tbody">{rows.map((row, index) => renderRow(row))}</Box>
            </Box>
            <Box {...props}>
                {afterRows}
                {cursor && onPageChange && (
                    <TablePagination
                        loading={loading}
                        onPageChange={onPageChange}
                        cursor={cursor}
                        {...footerStyleProps}
                    />
                )}
            </Box>
        </PseudoBox>
    );
};
