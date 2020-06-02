import React, { useEffect, useState } from 'react';
import { Box } from '../../../../src/Box';
import { Table, TableHeader, Td, Th, Tr } from '../../../../src/Table';

export const HomeTable = () => {
    const initialRows = [
        {
            first_name: 'Charlie',
            last_name: 'Foxtrot',
        },
        {
            first_name: 'Bravo',
            last_name: 'Echo',
        },
        {
            first_name: 'Delta',
            last_name: 'Hotel',
        },
        {
            first_name: 'Alpha',
            last_name: 'Gulf',
        },
    ];

    const [rows, setRows] = useState(initialRows);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(4);
    const [sorting, setSorting] = useState({
        id: 'first_name',
        direction: 'ascending',
    });

    // This would be handled by changing graphql prop - just using as an example here
    const onSort = ({ id, direction }) => {
        setSorting({ id, direction });
        const sortedRows = rows.sort((a, b) => {
            if (a[id] < b[id]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[id] > b[id]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        setRows(sortedRows);
    };
    useEffect(() => {
        onSort(sorting);
    }, []);

    const renderRow = props => {
        const { first_name, last_name } = props;
        return (
            <Tr key={first_name}>
                <Td>{first_name}</Td>
                <Td>{last_name}</Td>
            </Tr>
        );
    };

    const renderHeader = () => (
        <TableHeader sorting={sorting} onSort={onSort}>
            <Th id="first_name">First name</Th>
            <Th id="last_name">Last name</Th>
        </TableHeader>
    );

    const cursor = {
        total: 9,
        currentPage: page,
        perPage,
    };

    return (
        <Box>
            <Table
                rows={rows}
                renderRow={renderRow}
                renderHeader={renderHeader}
                cursor={cursor}
                onPageChange={current => setPage(current)}
                onPerPageChange={numRows => setPerPage(numRows)}
            />
        </Box>
    );
};
