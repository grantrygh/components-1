import { useWindowResize } from 'hooks/useWindowResize';
import React from 'react';
import { Box } from '../Box';
import { TablePagination } from './components/TablePagination';
import useTableStyle from './styles';
import { TableProps } from './types';

export const Table = (props: TableProps, ref) => {
    const {
        rows,
        renderRow,
        renderHeader,
        afterRows,
        loading,
        onPageChange,
        onPerPageChange,
        cursor,
        height,
        renderImmediately = true,
    } = props;
    const { windowWidth } = useWindowResize();

    const { table: tableStyleProps, container: containerStyleProps, footer: footerStyleProps } = useTableStyle({
        height,
    });

    if (!windowWidth && __BROWSER__ && !renderImmediately) {
        return null;
    }

    if (rows.constructor !== Array) {
        throw new Error('Table rows must be array type');
    }

    const header: any = renderHeader();

    return (
        <Box {...containerStyleProps}>
            <Box as="table" {...tableStyleProps}>
                {header}

                <Box as="tbody">{rows.map((row, index) => renderRow(row))}</Box>

                <Box as="tfoot" {...props}>
                    {afterRows}
                    <TablePagination
                        loading={loading}
                        onPageChange={onPageChange}
                        onPerPageChange={onPerPageChange}
                        cursor={cursor}
                        {...footerStyleProps}
                    />
                </Box>
            </Box>
        </Box>
    );
};
