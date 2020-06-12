import { Flex } from 'Flex';
import ChevronLeftIcon from 'mdi-react/ChevronLeftIcon';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import PageFirstIcon from 'mdi-react/PageFirstIcon';
import PageLastIcon from 'mdi-react/PageLastIcon';
import React from 'react';
import { Box } from '../../../Box';
import { Button } from '../../../Button';
import { Spinner } from '../../../Spinner';
import { TablePaginationProps } from '../../types';

export const TablePagination = ({ loading, onPageChange, cursor, children, ...props }: TablePaginationProps) => {
    const { total, perPage, currentPage } = cursor;
    const totalPages = cursor && Math.ceil(total / perPage);
    const lastPage = total % perPage > 0 ? Math.floor(total / perPage) + 1 : Math.floor(total / perPage);

    if (!cursor || totalPages <= 1 || !onPageChange) return null;

    return (
        <Flex align="center" justify="flex-end" w="100%" {...props}>
            {loading && <Spinner />}

            {children}

            <Flex whiteSpace="nowrap" align="center">
                <Button
                    onClick={() => {
                        onPageChange(1);
                    }}
                    iconOnly
                    leftIcon={PageFirstIcon}
                    variant="unstyled"
                    ariaLabel="First page"
                    isDisabled={currentPage === 1}
                />

                <Button
                    onClick={() => {
                        onPageChange(currentPage - 1);
                    }}
                    iconOnly
                    leftIcon={ChevronLeftIcon}
                    variant="unstyled"
                    ariaLabel="Previous page"
                    isDisabled={currentPage === 1}
                />

                <Box mx={4} fontSize="body">
                    {(currentPage - 1) * perPage + 1}-{currentPage * perPage} of {total}
                </Box>

                <Button
                    onClick={() => {
                        onPageChange(cursor.currentPage + 1);
                    }}
                    iconOnly
                    leftIcon={ChevronRightIcon}
                    variant="unstyled"
                    ariaLabel="Next page"
                    isDisabled={currentPage === lastPage}
                />

                <Button
                    onClick={() => {
                        onPageChange(lastPage);
                    }}
                    iconOnly
                    leftIcon={PageLastIcon}
                    variant="unstyled"
                    ariaLabel="Last page"
                    isDisabled={currentPage === lastPage}
                />
            </Flex>
        </Flex>
    );
};
