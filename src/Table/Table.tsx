import { Flex } from 'Flex';
import { motion } from 'framer-motion';
import ArrowUpIcon from 'mdi-react/ArrowUpIcon';
import ChevronLeftIcon from 'mdi-react/ChevronLeftIcon';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import PageFirstIcon from 'mdi-react/PageFirstIcon';
import PageLastIcon from 'mdi-react/PageLastIcon';
import React, { Children, cloneElement } from 'react';
import { Box } from '../Box';
import { PseudoBox } from '../PseudoBox';
import { Select } from '../Select';
import { Spinner } from '../Spinner';
import useTableStyle from './styles';
import {
    TableCellProps,
    TableFooterProps,
    TableHeaderProps,
    TablePaginationProps,
    TableProps,
    TableRowProps,
} from './types';

export const Table = (props: TableProps, ref) => {
    const { rows, renderRow, renderHeader, afterRows, loading, onPageChange, onPerPageChange, cursor, height } = props;

    const { table: tableStyleProps, container: containerStyleProps, footer: footerStyleProps } = useTableStyle({
        height,
    });

    const header: any = renderHeader();

    return (
        <Box {...containerStyleProps}>
            <Box as="table" {...tableStyleProps}>
                {header}

                <Box as="tbody">{rows.map((row, index) => renderRow(row))}</Box>
                <TableFooter>
                    {afterRows}
                    <TablePagination
                        loading={loading}
                        onPageChange={onPageChange}
                        onPerPageChange={onPerPageChange}
                        cursor={cursor}
                        {...footerStyleProps}
                    />
                </TableFooter>
            </Box>
        </Box>
    );
};

const spring = {
    type: 'spring',
    damping: 50,
    stiffness: 300,
};

export const Tr = ({ id, ...props }: TableRowProps) => {
    const { row: rowStyleProps } = useTableStyle({});
    return (
        <motion.tr key={id} layoutTransition={spring}>
            <Box as="td" {...rowStyleProps} {...props} />
        </motion.tr>
    );
};

export const Td = (props: TableCellProps) => {
    const { cell: cellStyleProps } = useTableStyle({});
    return <Box as="td" {...cellStyleProps} {...props} />;
};

export const Th = React.forwardRef(({ id, sorting, onSort, ...props }: TableCellProps, ref) => {
    const { cell: cellStyleProps, headerCell: headerCellStyleProps } = useTableStyle({ sortable: id && onSort });
    const showIcon = sorting.id === id;
    return (
        <PseudoBox
            as="th"
            ref={ref}
            onClick={() => {
                if (id && onSort) {
                    onSort({ id, direction: sorting.direction === 'ascending' ? 'descending' : 'ascending' });
                }
            }}
            {...cellStyleProps}
            {...headerCellStyleProps}
            {...props}
        >
            <Box>{props.children}</Box>
            {showIcon && (
                <Box ml={1} transform={`rotate(${sorting.direction === 'ascending' ? 0 : 180}deg)`} transition="0.2s">
                    <ArrowUpIcon size={16} />
                </Box>
            )}
        </PseudoBox>
    );
});

export const TableHeader = React.forwardRef((props: TableHeaderProps, ref) => {
    const { children, sticky, sorting, onSort, ...rest } = props;
    const { header: headerStyleProps, headerRow: headerRowStyleProps } = useTableStyle({ sticky });

    return (
        <Box ref={ref} as="thead" {...headerStyleProps} {...rest}>
            <Tr {...headerRowStyleProps}>
                {Children.map(children, (child, index) => {
                    if (child) {
                        return cloneElement(child as any, {
                            sorting,
                            onSort,
                        });
                    }
                    return null;
                })}
            </Tr>
        </Box>
    );
});

const TableFooter = ({ ...props }: TableFooterProps) => (
    <Box as="tfoot" {...props}>
        {props.children}
    </Box>
);

const TablePagination = ({ loading, onPageChange, onPerPageChange, cursor, ...props }: TablePaginationProps) => {
    const { total, perPage, currentPage } = cursor;
    const totalPages = cursor && Math.ceil(total / perPage);
    const lastPage = total % perPage > 0 ? Math.floor(total / perPage) + 1 : Math.floor(total / perPage);

    if (!cursor || totalPages <= 1 || !onPageChange) return null;

    const options = [
        { value: '5', label: '5 rows' },
        { value: '10', label: '10 rows' },
        { value: '20', label: '20 rows' },
        { value: '50', label: '50 rows' },
    ];

    const disabled = {
        pointerEvents: 'none',
        color: 'faintText',
    };

    const enabled = {
        cursor: 'pointer',
        _hover: {
            color: 'titleText',
        },
    };

    return (
        <Tr {...props}>
            <Flex align="center" justify="flex-end" w="100%">
                {loading && <Spinner />}

                {onPerPageChange && (
                    <Flex mr={4}>
                        <Select
                            placeholder={`${perPage} rows`}
                            onChange={v => onPerPageChange(Number(v.value))}
                            options={options}
                            name="rows"
                            size="sm"
                            menuPosition="fixed"
                        />
                    </Flex>
                )}

                <PseudoBox {...(currentPage === 1 ? disabled : enabled)}>
                    <PageFirstIcon
                        onClick={() => {
                            onPageChange(1);
                        }}
                    />
                </PseudoBox>

                <PseudoBox {...(currentPage === 1 ? disabled : enabled)}>
                    <ChevronLeftIcon
                        onClick={() => {
                            onPageChange(currentPage - 1);
                        }}
                    />
                </PseudoBox>

                <Box mx={4} fontSize="body">
                    {(currentPage - 1) * perPage + 1}-{currentPage * perPage} of {total}
                </Box>

                <PseudoBox {...(currentPage === lastPage ? disabled : enabled)}>
                    <ChevronRightIcon
                        onClick={() => {
                            onPageChange(cursor.currentPage + 1);
                        }}
                    />
                </PseudoBox>

                <PseudoBox {...(currentPage === lastPage ? disabled : enabled)}>
                    <PageLastIcon
                        onClick={() => {
                            onPageChange(lastPage);
                        }}
                    />
                </PseudoBox>
            </Flex>
        </Tr>
    );
};
