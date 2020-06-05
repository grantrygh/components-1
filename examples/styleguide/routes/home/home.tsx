import MenuIcon from 'mdi-react/MenuIcon';
import React from 'react';
import { Button, ButtonGroup, Flex, Icon, Tab, TabList, Tabs } from '../../../../src';
import { useCanvasContext } from '../../../../src/Canvas';
import { useColorMode } from '../../../../src/ColorModeProvider';
import { Page, PageContent } from '../../../../src/Page';
import { HomeTable } from '../../components/HomeTable/HomeTable';

export function Home(props) {
    const { togglePanel, panels } = useCanvasContext();
    const { mode, setMode } = useColorMode();

    console.log('home panels', panels);

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

                <HomeTable />

                <Flex h={1500} w={50} align="center">
                    for testing sticky header
                </Flex>
            </PageContent>
        </Page>
    );
}
