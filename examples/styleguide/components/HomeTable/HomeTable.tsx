import React, { useEffect, useState } from 'react';
import { Avatar } from '../../../../src/Avatar';
import { Box } from '../../../../src/Box';
import { Button } from '../../../../src/Button';
import { ButtonGroup } from '../../../../src/ButtonGroup';
import { Flex } from '../../../../src/Flex';
import { Heading } from '../../../../src/Heading';
import { Stack } from '../../../../src/Stack';
import { AnimatedTr, Table, TableHeader, TableProvider, Td, Th } from '../../../../src/Table';
import { Text } from '../../../../src/Text';

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
            first_name: 'Alpha Alpha Alpha',
            last_name: 'Gulf',
        },
    ];

    const [rows, setRows] = useState(initialRows);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(4);
    const [sorting, setSorting] = useState({
        id: 'first_name',
        direction: 'asc',
    });

    // These would be handled through graphQL - just using as an example here
    const cursor = {
        total: 24,
        currentPage: page,
        perPage,
    };
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

    return (
        <TableProvider>
            {({ width }) => {
                const renderRow = props => {
                    const { first_name, last_name } = props;

                    if (width < 768) {
                        return (
                            <AnimatedTr
                                key={first_name}
                                expandedContent={
                                    <Box>
                                        <Flex>
                                            <Avatar
                                                name="Uchiha Sasuke"
                                                size="lg"
                                                mr={4}
                                                src="https://vignette.wikia.nocookie.net/naruto/images/2/21/Sasuke_Part_1.png/revision/latest?cb=20170716092103"
                                            />
                                            <Stack>
                                                <Heading kind="h6">{first_name}</Heading>
                                                <Text maxW={600}>
                                                    "Anim pariatur cliche reprehenderit, enim eiusmod high life
                                                    accusamus terry richardson ad squid. Nihilanim keffiyeh helvetica,
                                                    craft beer labore wes anderson cred nesciunt sapiente ea proident."
                                                </Text>
                                                <Text>Date joined: January 30, 2020</Text>
                                                <Text>Status: Pending</Text>
                                                <ButtonGroup>
                                                    <Button>Edit</Button>
                                                    <Button variant="primary" variantColor="error">
                                                        Delete
                                                    </Button>
                                                </ButtonGroup>
                                            </Stack>
                                        </Flex>
                                    </Box>
                                }
                            >
                                <Td>
                                    <Flex align="center">
                                        <Avatar
                                            name="Uchiha Sasuke"
                                            size="sm"
                                            mr={2}
                                            src="https://vignette.wikia.nocookie.net/naruto/images/2/21/Sasuke_Part_1.png/revision/latest?cb=20170716092103"
                                        />
                                        {first_name}
                                    </Flex>
                                </Td>
                                <Td>{last_name}</Td>
                            </AnimatedTr>
                        );
                    }

                    return (
                        <AnimatedTr
                            key={first_name}
                            expandedContent={
                                <Flex align="center" justify="space-between">
                                    <Flex>
                                        <Avatar
                                            name="Uchiha Sasuke"
                                            size="lg"
                                            mr={4}
                                            src="https://vignette.wikia.nocookie.net/naruto/images/2/21/Sasuke_Part_1.png/revision/latest?cb=20170716092103"
                                        />
                                        <Stack mb={0}>
                                            <Heading kind="h6">{first_name}</Heading>
                                            <Text maxW={600}>
                                                "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                                terry richardson ad squid. Nihilanim keffiyeh helvetica, craft beer
                                                labore wes anderson cred nesciunt sapiente ea proident."
                                            </Text>
                                        </Stack>
                                    </Flex>
                                    <ButtonGroup>
                                        <Button>Edit</Button>
                                        <Button variant="primary" variantColor="error">
                                            Delete
                                        </Button>
                                    </ButtonGroup>
                                </Flex>
                            }
                        >
                            <Td span={2}>
                                <Flex align="center">
                                    <Avatar
                                        name="Uchiha Sasuke"
                                        size="sm"
                                        mr={2}
                                        src="https://vignette.wikia.nocookie.net/naruto/images/2/21/Sasuke_Part_1.png/revision/latest?cb=20170716092103"
                                    />
                                    {first_name}
                                </Flex>
                            </Td>
                            <Td>{last_name}</Td>
                            <Td>January 30, 2020</Td>
                            <Td>Pending</Td>
                        </AnimatedTr>
                    );
                };

                const renderHeader = () => {
                    if (width < 768) {
                        return (
                            <TableHeader sorting={sorting} onSort={onSort}>
                                <Th id="first_name">First name</Th>
                                <Th id="last_name">Last name</Th>
                            </TableHeader>
                        );
                    }

                    return (
                        <TableHeader sorting={sorting} onSort={onSort}>
                            <Th id="first_name" span={2}>
                                First name
                            </Th>
                            <Th id="last_name">Last name</Th>
                            <Th>Date joined</Th>
                            <Th>Status</Th>
                        </TableHeader>
                    );
                };

                return (
                    <Table
                        rows={rows}
                        renderRow={renderRow}
                        renderHeader={renderHeader}
                        cursor={cursor}
                        onPageChange={current => setPage(current)}
                    />
                );
            }}
        </TableProvider>
    );
};
