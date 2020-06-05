import MenuIcon from 'mdi-react/MenuIcon';
import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Flex, Heading, Text } from '../../../../src';
import { useCanvasContext } from '../../../../src/Canvas';
import { useColorMode } from '../../../../src/ColorModeProvider';
import { Page, PageContent } from '../../../../src/Page';
import { FilterMenuForm } from '../../components/FilterMenuForm';
import { HomeTable } from '../../components/HomeTable/HomeTable';

export function Shop(props) {
    const [formValue, setFormValue] = useState(null);
    const { togglePanel, addPanel, updatePanel, removePanel } = useCanvasContext();
    const { mode, setMode } = useColorMode();

    useEffect(() => {
        addPanel('filter', () => ({
            name: 'filter',
            position: 'left',
            ranges: {
                isOverlay: [0, 1024],
                allowMinify: false,
                defaultVisible: [0, 9999],
                defaultMinified: false,
            },
            render: componentProps => <FilterMenuForm onSubmit={val => setFormValue(val)} />,
            bg: 'navBg',
        }));

        return () => {
            removePanel('filter');
        };
    }, []);

    return (
        <Page>
            <PageContent>
                <ButtonGroup w="100%" mb="spacing">
                    <Button onClick={() => togglePanel('menu')}>Toggle Navigation Menu</Button>
                    <Button onClick={() => togglePanel('filter')}>Toggle Filters</Button>
                    <Button
                        variant="tertiary"
                        onClick={() => {
                            setMode(mode === 'light' ? 'dark' : 'light');
                        }}
                        leftIcon={MenuIcon}
                    >
                        Switch to {mode === 'light' ? 'dark' : 'light'} mode
                    </Button>
                </ButtonGroup>

                {formValue && (
                    <Box>
                        <Heading kind="h6">Filters applied</Heading>
                        {Object.keys(formValue).map(key => {
                            return (
                                <Text>
                                    {key} : {formValue[key].toString()}
                                </Text>
                            );
                        })}
                    </Box>
                )}

                <HomeTable />

                <Flex h={1500} w={50} align="center">
                    for testing sticky header
                </Flex>
            </PageContent>
        </Page>
    );
}
