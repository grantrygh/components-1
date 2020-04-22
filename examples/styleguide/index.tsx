import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Box, Button, ButtonGroup, Heading, Text } from '../../src';
import { CanvasContext } from '../../src/Canvas';
import { Page, PageContent } from '../../src/Page';
import { AppShell } from './components/AppShell';
import { FilterMenuForm } from './components/FilterMenuForm';

function StyleGuide(props) {
    const { panels, togglePanel, setPanel } = useContext(CanvasContext);
    const [formValue, setFormValue] = useState(null);

    useEffect(() => {
        setPanel('filter', () => ({
            name: 'filter',
            position: 'left',
            type: 'inline',
            isMinifiable: false,
            isVisible: false,
            isStackable: true,
            render: componentProps => <FilterMenuForm onSubmit={val => setFormValue(val)} />,
            bg: 'navBg',
        }));
    }, []);

    return (
        <Page>
            <PageContent>
                <ButtonGroup>
                    <Button onClick={() => togglePanel('menu')}>Toggle Navigation Menu Canvas</Button>
                    <Button onClick={() => togglePanel('filter')}>Toggle Filter Canvas</Button>
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
            </PageContent>
        </Page>
    );
}

ReactDOM.render(
    <AppShell>
        <StyleGuide />
    </AppShell>,
    document.getElementById('root')
);
