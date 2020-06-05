import MenuIcon from 'mdi-react/MenuIcon';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Box, Button, ButtonGroup, Flex, Heading, Icon, Tab, TabList, Tabs, Text } from '../../src';
import { useCanvasContext } from '../../src/Canvas';
import { useColorMode } from '../../src/ColorModeProvider';
import { Page, PageContent } from '../../src/Page';
import { AppShell } from './components/AppShell';
import { FilterMenuForm } from './components/FilterMenuForm';
import { HomeTable } from './components/HomeTable';

function StyleGuide(props) {
    const [formValue, setFormValue] = useState(null);
    const { togglePanel, setPanel } = useCanvasContext();
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
    }, []);

    return (
        <Page>
            <PageContent>
                <Tabs size="lg">
                    <TabList>
                        <Tab>
                            <Icon name="phone" size="1em" mr="spacing-sm" />
                            Settings
                        </Tab>
                        <Tab>Billings</Tab>
                        <Tab>Preferences</Tab>
                        <Tab isDisabled>Shut Down</Tab>
                    </TabList>
                </Tabs>
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

ReactDOM.render(
    <BrowserRouter>
        <AppShell>
            <StyleGuide />
        </AppShell>
    </BrowserRouter>,
    document.getElementById('root')
);
