import { Collapse } from 'Collapse';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import React from 'react';
import { Box } from '../../../Box';
import { useTheme } from '../../../ThemeProvider';
import useTableStyle from '../../styles';
import { TableRowProps } from '../../types';
import { Td } from '../Td';

export const Tr = (props: TableRowProps) => {
    const { colors } = useTheme();
    const { expandedContent, asComponent } = props;
    const { row: rowStyleProps } = useTableStyle({
        expandedContent,
    });
    const [expanded, setExpanded] = React.useState(false);

    const handleExpand = () => setExpanded(!expanded);
    const RowComponent = !asComponent ? Box : asComponent;
    const rowProps = asComponent ? {} : { as: 'tr' };

    return (
        <>
            <RowComponent
                style={
                    // needed to apply styles to motion component while keeping correct table structure
                    asComponent && {
                        ...rowStyleProps,
                        borderColor: colors.border,
                    }
                }
                {...rowProps}
                {...rowStyleProps}
                {...props}
            >
                {props.children}
                {expandedContent && (
                    <td>
                        <Box position="absolute" right={4} top={4}>
                            <ChevronDownIcon onClick={handleExpand} />
                        </Box>
                    </td>
                )}
            </RowComponent>
            <ExpandedRow expanded={expanded} {...props} />
        </>
    );
};

const ExpandedRow = props => {
    const { expandedContent, expanded } = props;
    if (!expandedContent) {
        return null;
    }
    return (
        <Tr {...props} expandedContent={null} borderBottomWidth={1}>
            <Td py={0}>
                <Collapse mt={2} mb={4} isOpen={expanded}>
                    {expandedContent}
                </Collapse>
            </Td>
        </Tr>
    );
};
