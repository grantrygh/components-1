import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import React from 'react';
import { Box } from '../../../Box';
import { Button } from '../../../Button';
import { Collapse } from '../../../Collapse';
import { PseudoBox } from '../../../PseudoBox';
import useTableStyle from '../../styles';
import { TableRowProps } from '../../types';
import { Td } from '../Td';

export const Tr = ({ expandedContent, children, ...rest }: TableRowProps) => {
    const { row: rowStyleProps } = useTableStyle({
        expandedContent,
    });
    const [expanded, setExpanded] = React.useState(false);

    const handleExpand = () => setExpanded(!expanded);

    return (
        <>
            <PseudoBox
                as="tr"
                {...rowStyleProps}
                {...rest}
                d="table-row"
                {...(expandedContent ? { onClick: handleExpand, cursor: 'pointer' } : {})}
            >
                {children}

                {expandedContent && (
                    <Box as="td" w="expandedRowTrigger">
                        <Button
                            onClick={handleExpand}
                            size="sm"
                            variant="unstyled"
                            leftIcon={() => (
                                <Box
                                    transform={expanded ? 'rotate(180deg)' : 'rotate(0deg)'}
                                    transition="0.2s"
                                    willChange="rotate"
                                >
                                    <ChevronDownIcon />
                                </Box>
                            )}
                            color="faintText"
                            iconOnly
                        />
                    </Box>
                )}
            </PseudoBox>
            <ExpandedRow expanded={expanded} expandedContent={expandedContent} />
        </>
    );
};

const ExpandedRow = (props) => {
    const { expandedContent, expanded } = props;
    const { expandedRow: expandedRowStyleProps } = useTableStyle({});
    if (!expandedContent || !expanded) {
        return null;
    }
    return (
        <Box
            as="tr"
            {...expandedRowStyleProps}
            expandedContent={null}
            borderBottomWidth={expanded ? 1 : 0}
            borderColor="border"
        >
            <Td colSpan="100%">
                <Collapse my="spacing" isOpen={expanded}>
                    {expandedContent}
                </Collapse>
            </Td>
        </Box>
    );
};
