import { storiesOf } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import { Box } from '../Box';
import { CriticalActionsTd } from '../CriticalActionsTd';
import { Table, TableHeader, Td, Th, Tr } from '../Table';
import { Text } from '../Text';
import { ITableCell } from './types';

const stories = storiesOf('Table', module);

stories.add('Default', () => {
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
    const [sorting, setSorting] = useState({
        id: 'first_name',
        direction: 'asc',
    } as ITableCell['sorting']);

    // This would be handled by changing graphql prop - just using as an example here
    const onSort = ({ id, direction }) => {
        setSorting({ id, direction });
        const sortedRows = rows.sort((a, b) => {
            if (a[id] < b[id]) {
                return direction === 'asc' ? -1 : 1;
            }
            if (a[id] > b[id]) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setRows(sortedRows);
    };
    useEffect(() => {
        onSort(sorting);
    }, []);

    const renderRow = (props) => {
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
        currentPage: 2,
        perPage: 4,
    };

    return (
        <Box>
            <Table
                rows={rows}
                renderRow={renderRow}
                renderHeader={renderHeader}
                cursor={cursor}
                onPageChange={(page) => console.log('page: ', page)}
            />
        </Box>
    );
});

stories.add('Critical actions cell', () => {
    const rows = [
        {
            first_name: 'Charlie',
            last_name: 'Foxtrot',
            location: 'Los Angeles',
            dob: 'December 25, 1990',
        },
        {
            first_name: 'Bravo',
            last_name: 'Echo',
            location: 'Los Angeles',
            dob: 'December 25, 1990',
        },
        {
            first_name: 'Delta',
            last_name: 'Hotel',
            location: 'Los Angeles',
            dob: 'December 25, 1990',
        },
        {
            first_name: 'Alpha',
            last_name: 'Gulf',
            location: 'Los Angeles',
            dob: 'December 25, 1990',
        },
    ];

    const renderRow = (props) => {
        const { first_name, last_name, location, dob } = props;
        return (
            <Tr key={first_name}>
                <Td>{first_name}</Td>
                <Td>{last_name}</Td>
                <Td>
                    <Text whiteSpace="nowrap">{location}</Text>
                </Td>
                <Td>
                    <Text whiteSpace="nowrap">{dob}</Text>
                </Td>
                <CriticalActionsTd
                    mobileMenu={last_name !== 'Hotel'}
                    actions={[
                        {
                            label: 'Ban',
                            onClick: () => console.log('Ban user'),
                        },
                        {
                            label: 'Delete',
                            onClick: () => console.log('Delete user'),
                            variantColor: 'error',
                        },
                    ]}
                />
            </Tr>
        );
    };

    const renderHeader = () => (
        <TableHeader>
            <Th id="first_name">First name</Th>
            <Th id="last_name">Last name</Th>
            <Th id="first_name">Location</Th>
            <Th id="last_name">Date of birth</Th>
            <Th />
        </TableHeader>
    );

    const cursor = {
        total: 9,
        currentPage: 2,
        perPage: 4,
    };

    return (
        <Box>
            <Table
                rows={rows}
                renderRow={renderRow}
                renderHeader={renderHeader}
                cursor={cursor}
                onPageChange={(page) => console.log('page: ', page)}
            />
        </Box>
    );
});
