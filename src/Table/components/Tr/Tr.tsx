import React from 'react';
import { Box } from '../../../Box';
import { Button } from '../../../Button';
import { Collapse } from '../../../Collapse';
import useTableStyle from '../../styles';
import { TableRowProps } from '../../types';

export const Tr = ({ id, expandedContent, asComponent, ...props }: TableRowProps) => {
    const { row: rowStyleProps } = useTableStyle({});
    const [expanded, setExpanded] = React.useState(false);

    const handleExpand = () => setExpanded(!expanded);
    const RowComponent = !asComponent ? Box : asComponent;
    const rowProps = asComponent ? {} : { as: 'tr' };

    return (
        <>
            <RowComponent {...rowProps} {...props}>
                <Box as="td" {...rowStyleProps} />
                {expandedContent && (
                    <td>
                        <Button onClick={handleExpand}>Toggle</Button>
                    </td>
                )}
            </RowComponent>
            {expandedContent && (
                <tr>
                    <td>
                        <Collapse mt="spacing" isOpen={expanded}>
                            {expandedContent}
                        </Collapse>
                    </td>
                </tr>
            )}
        </>
    );
};
