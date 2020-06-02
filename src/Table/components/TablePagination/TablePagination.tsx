import { Flex } from 'Flex';
import ChevronLeftIcon from 'mdi-react/ChevronLeftIcon';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import PageFirstIcon from 'mdi-react/PageFirstIcon';
import PageLastIcon from 'mdi-react/PageLastIcon';
import React from 'react';
import { Box } from '../../../Box';
import { PseudoBox } from '../../../PseudoBox';
import { Select } from '../../../Select';
import { Spinner } from '../../../Spinner';
import { TablePaginationProps } from '../../types';
import { Tr } from '../Tr';

export const TablePagination = ({ loading, onPageChange, onPerPageChange, cursor, ...props }: TablePaginationProps) => {
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
