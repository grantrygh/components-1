import { shuffle } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Box } from '../../../../src/Box';
import { Table, TableHeader, Td, Th, Tr } from '../../../../src/Table';

export const HomeTable = () => {
    const initialRows = [
        {
            name: 'First',
            last: 'First Last Name',
        },
        {
            name: 'Second',
            last: 'Second Last Name',
        },
        {
            name: 'Third',
            last: 'Third Last Name',
        },
        {
            name: 'Fourth',
            last: 'Fourth Last Name',
        },
    ];

    const [rows, setRows] = useState(initialRows);

    useEffect(() => {
        setTimeout(() => setRows(shuffle(rows)), 5000);
    }, [rows]);

    const renderRow = props => {
        const { name, last } = props;
        return (
            <Tr key={name}>
                <Td>{name}</Td>
                <Td>{last}</Td>
            </Tr>
        );
    };

    const renderHeader = () => (
        <TableHeader>
            <Th>First</Th>
            <Th>Last</Th>
        </TableHeader>
    );

    const cursor = {
        total: 8,
        currentPage: 1,
        perPage: 4,
    };

    return (
        <Box>
            <Table
                rows={rows}
                renderRow={renderRow}
                renderHeader={renderHeader}
                cursor={cursor}
                onPageChange={page => console.log('page: ', page)}
                onPerPageChange={perPage => console.log('per page: ', perPage)}
            />
        </Box>
    );
};
