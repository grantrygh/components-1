import MenuIcon from 'mdi-react/MenuIcon';
import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Box, Button, ButtonGroup, Flex, Heading, Text, useColorMode } from '../../src';
import { CanvasContext } from '../../src/Canvas';
import { Page, PageContent } from '../../src/Page';
import { AppShell } from './components/AppShell';
import { FilterMenuForm } from './components/FilterMenuForm';
import { HomeTable } from './components/HomeTable';

function StyleGuide(props) {
    const [formValue, setFormValue] = useState(null);
    const { togglePanel, setPanel } = useContext(CanvasContext);
    const { mode, setMode } = useColorMode();

    useEffect(() => {
        setPanel('filter', () => ({
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

        setPanel('messages', () => ({
            name: 'messages',
            position: 'right',
            ranges: {
                isOverlay: [0, 9999],
                allowMinify: false,
                defaultVisible: false,
                defaultMinified: false,
            },
            render: componentProps => <FilterMenuForm onSubmit={val => setFormValue(val)} />,
            bg: 'navBg',
        }));
    }, []);

    return (
        <Page>
            <PageContent>
                <ButtonGroup w="100%">
                    <Button onClick={() => togglePanel('menu')}>Toggle Navigation Menu Canvas</Button>
                    <Button onClick={() => togglePanel('filter')}>Toggle Filter Canvas</Button>
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

                <Flex justify="flex-end" w="100%">
                    <Button onClick={() => togglePanel('messages')}>Toggle Message Canvas</Button>
                </Flex>

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

ReactDOM.render(
    <BrowserRouter>
        <AppShell>
            <StyleGuide />
        </AppShell>
    </BrowserRouter>,
    document.getElementById('root')
);
