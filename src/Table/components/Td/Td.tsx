import React from 'react';
import { Box } from '../../../Box';
import useTableStyle from '../../styles';
import { TableCellProps } from '../../types';

export const Td = (props: TableCellProps) => {
    const { cell: cellStyleProps } = useTableStyle({
        span: props.span,
    });
    return (
        <Box as="td" {...cellStyleProps} {...props}>
            {props.children}
        </Box>
    );
};
