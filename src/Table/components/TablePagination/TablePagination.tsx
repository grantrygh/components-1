import { Flex } from 'Flex';
import ChevronLeftIcon from 'mdi-react/ChevronLeftIcon';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import PageFirstIcon from 'mdi-react/PageFirstIcon';
import PageLastIcon from 'mdi-react/PageLastIcon';
import React from 'react';
import { Box } from '../../../Box';
import { PseudoBox } from '../../../PseudoBox';
import { Spinner } from '../../../Spinner';
import { TablePaginationProps } from '../../types';
import { Td } from '../Td';
import { Tr } from '../Tr';

export const TablePagination = ({ loading, onPageChange, cursor, children, ...props }: TablePaginationProps) => {
    const { total, perPage, currentPage } = cursor;
    const totalPages = cursor && Math.ceil(total / perPage);
    const lastPage = total % perPage > 0 ? Math.floor(total / perPage) + 1 : Math.floor(total / perPage);

    if (!cursor || totalPages <= 1 || !onPageChange) return null;

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
            <Td p={0} borderWidth={0}>
                <Flex align="center" justify="flex-end" w="100%">
                    {loading && <Spinner />}

                    {children}

                    <Flex whiteSpace="nowrap">
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
                </Flex>
            </Td>
        </Tr>
    );
};
