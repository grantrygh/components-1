import MenuIcon from 'mdi-react/MenuIcon';
import React from 'react';
import { Button, ButtonGroup, Flex, Icon, Tab, TabList, Tabs } from '../../../../src';
import { useCanvasContext } from '../../../../src/Canvas';
import { useColorMode } from '../../../../src/ColorModeProvider';
import { TabPanel, TabPanels } from '../../../../src/Tabs';
import { HomeTable } from '../../components/HomeTable/HomeTable';
import { Page } from '../../components/Page';

export function Home(props) {
    const { togglePanel, panels } = useCanvasContext();
    const { mode, setMode } = useColorMode();

    return (
        <Page title="Home">
            <Tabs size="lg">
                <TabList>
                    <Tab>
                        <Icon name="phone" size="1em" mr="spacing-sm" />
                        Table
                    </Tab>
                    <Tab>Toggles</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <HomeTable />

                        <Flex h={1500} w={50} align="center">
                            for testing sticky header
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <ButtonGroup w="100%" mb="spacing">
                            <Button onClick={() => togglePanel('menu')}>Toggle Navigation Menu</Button>
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
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Page>
    );
}
