import ArrowUpIcon from 'mdi-react/ArrowUpIcon';
import React from 'react';
import { Box } from '../../../Box';
import { Flex } from '../../../Flex';
import { PseudoBox } from '../../../PseudoBox';
import useTableStyle from '../../styles';
import { TableCellProps } from '../../types';

export const Th = React.forwardRef(({ id, sorting, onSort, span, ...props }: TableCellProps, ref) => {
    const { cell: cellStyleProps, headerCell: headerCellStyleProps } = useTableStyle({ sortable: id && onSort, span });
    const showIcon = sorting.id === id;
    return (
        <PseudoBox
            as="th"
            ref={ref}
            onClick={() => {
                if (id && onSort) {
                    onSort({ id, direction: sorting.direction === 'asc' ? 'desc' : 'asc' });
                }
            }}
            {...cellStyleProps}
            {...props}
        >
            <Flex {...headerCellStyleProps}>
                <Box>{props.children}</Box>
                {showIcon && (
                    <Box ml={1} transform={`rotate(${sorting.direction === 'asc' ? 0 : 180}deg)`} transition="0.2s">
                        <ArrowUpIcon size={16} />
                    </Box>
                )}
            </Flex>
        </PseudoBox>
    );
});
