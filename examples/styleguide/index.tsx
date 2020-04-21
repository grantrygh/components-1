import MenuIcon from 'mdi-react/MenuIcon';
import React, { useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Box, Button } from '../../src';
import { CanvasContext } from '../../src/Canvas';
import { Page } from '../../src/Page';
import { AppShell } from './components/AppShell';

function StyleGuide(props) {
    const { panels, togglePanel, setPanel } = useContext(CanvasContext);

    useEffect(() => {
        setPanel('mini', () => ({
            name: 'mini',
            position: 'left',
            // bg: 'navBg',
            width: '228px',
            isVisible: false,
            isStackable: true,
            render: componentProps => <Box>Route defined canvas</Box>,
            type: 'inline',
        }));
    }, []);

    return (
        <Page>
            <Box>this is the content</Box>
            <Button onClick={() => togglePanel('menu')}>Toggle Minified Sidebar</Button>

            <Box mr="2">
                <MenuIcon
                    color="red"
                    title="Overlay"
                    onClick={() => {
                        togglePanel('mini');
                    }}
                />
            </Box>
        </Page>
    );
}

ReactDOM.render(
    <AppShell>
        <StyleGuide />
    </AppShell>,
    document.getElementById('root')
);
