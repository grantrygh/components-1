import React from 'react';
import { Box } from '../../../Box';
import useTableStyle from '../../styles';
import { TableCellProps } from '../../types';

export const Td = (props: TableCellProps) => {
    const { cell: cellStyleProps } = useTableStyle({});
    return <Box as="td" {...cellStyleProps} {...props} />;
};
