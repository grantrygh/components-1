/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '.';
import { Box } from '../Box';
import { Icon } from '../Icon';

const stories = storiesOf('Tabs', module).addDecorator(withKnobs);

stories.addDecorator(story => (
    <Box maxWidth="xl" mx="auto" mt="spacing">
        {story()}
    </Box>
));

const Content = styled.div`
    margin-top: 16px;
    align-items: center;
    color: rgb(107, 119, 140);
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    font-size: 4em;
    font-weight: 300;
    justify-content: center;
    padding: 32px;
`;

stories.add('Default', () => {
    return (
        <Tabs isFitted>
            <TabList>
                <Tab>
                    <Icon name="phone" size="1em" mr="spacing-sm" />
                    Settings
                </Tab>
                <Tab>Billings</Tab>
                <Tab>Preferences</Tab>
                <Tab isDisabled>Shut Down</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <Content>Settings</Content>
                </TabPanel>
                <TabPanel>
                    <Content>Billings</Content>
                </TabPanel>
                <TabPanel>
                    <Content>Preferences</Content>
                </TabPanel>
                <TabPanel>
                    <Content>Shut Down</Content>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
});

stories.add('Enclosed', () => {
    return (
        <Tabs variant="enclosed" isFitted variantColor="secondary">
            <TabList>
                <Tab>
                    <Icon name="phone" size="1em" mr="spacing-sm" />
                    Settings
                </Tab>
                <Tab>Billings</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <Content>Settings</Content>
                </TabPanel>
                <TabPanel>
                    <Content>Billings</Content>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
});

stories.add('Enclosed Colored', () => {
    return (
        <Tabs variant="enclosed-colored" isFitted>
            <TabList>
                <Tab>
                    <Icon name="phone" size="1em" mr="spacing-sm" />
                    Settings
                </Tab>
                <Tab>Billings</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <Content>Settings</Content>
                </TabPanel>
                <TabPanel>
                    <Content>Billings</Content>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
});

stories.add('Soft Rounded', () => {
    return (
        <Tabs variant="soft-rounded">
            <TabList>
                <Tab>
                    <Icon name="phone" size="1em" mr="spacing-sm" />
                    Settings
                </Tab>
                <Tab>Billings</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <Content>Settings</Content>
                </TabPanel>
                <TabPanel>
                    <Content>Billings</Content>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
});

stories.add('Solid Rounded', () => {
    return (
        <Tabs variant="solid-rounded">
            <TabList>
                <Tab>
                    <Icon name="phone" size="1em" mr="spacing-sm" />
                    Settings
                </Tab>
                <Tab>Billings</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <Content>Settings</Content>
                </TabPanel>
                <TabPanel>
                    <Content>Billings</Content>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
});

stories.add('Tablist Only (Manual)', () => {
    const props = {
        variant: select(
            'variant',
            ['solid-rounded', 'enclosed', 'enclosed-colored', 'soft-rounded', 'line'],
            'enclosed'
        ),
        align: select('alignment', ['start', 'center', 'end'], 'center'),
        size: select('size', ['sm', 'md', 'lg'], 'md'),
        isFitted: boolean('isFitted?', false),
        gutter: '12px',
        orientation: select('orientation', ['horizontal', 'vertical'], 'horizontal'),
    };

    const TabEx = () => {
        const [index, setIndex] = React.useState(2);
        return (
            <>
                <input type="range" max="4" min="0" value={index} onChange={e => setIndex(Number(e.target.value))} />
                <Tabs {...props} color="green" index={index} defaultIndex={2} isManual onChange={setIndex}>
                    <TabList>
                        <Tab>Tab 1</Tab>
                        <Tab>Tab 2</Tab>
                        <Tab>Tab 3</Tab>
                        <Tab>Tab 4</Tab>
                        <Tab>Tab 5</Tab>
                    </TabList>
                </Tabs>
            </>
        );
    };

    return <TabEx />;
});
