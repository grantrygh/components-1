/** @jsx jsx */
import { jsx } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import { Box } from '../Box';
import { Table, Td, Tr } from './Table';

const stories = storiesOf('Table', module);

stories.add('Default', () => {
    const rows = [
        {
            name: 'First',
            last: 'First Last Name',
        },
        {
            name: 'Second',
            last: 'Second Last Name',
        },
    ];
    const renderRow = props => {
        const { name, last } = props;
        return (
            <Tr>
                <Td>{name}</Td>
                <Td>{last}</Td>
            </Tr>
        );
    };

    const renderHeader = () => (
        <Tr>
            <Td>First</Td>
            <Td>Last</Td>
        </Tr>
    );

    return (
        <Box>
            <Table rows={rows} renderRow={renderRow} renderHeader={renderHeader} />
        </Box>
    );
});
