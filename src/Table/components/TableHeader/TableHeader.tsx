import React, { Children, cloneElement } from 'react';
import { Box } from '../../../Box';
import useTableStyle from '../../styles';
import { TableHeaderProps } from '../../types';
import { Tr } from '../Tr';

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
