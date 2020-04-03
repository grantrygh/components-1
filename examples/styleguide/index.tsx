import MenuIcon from 'mdi-react/MenuIcon';
import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
    Box,
    CSSReset,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    Navigation,
    theme,
    ThemeProvider,
    UserDropdown,
} from '../../src';
import CanvasContainer, { CanvasContext, CanvasPanel } from '../../src/Canvas';
import { Logo } from './components/Logo';

const initialCanvasState = {
    drawer: { overlay: false, inline: true },
};

function StyleGuide(props) {
    return (
        <HelmetProvider>
            <ThemeProvider theme={{ ...theme, fonts: { ...theme.fonts, heading: 'Poppins' } }}>
                <CSSReset />

                <Helmet>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,500;0,700;1,400&display=swap"
                        rel="stylesheet"
                    />
                </Helmet>

                <CanvasContainer initialState={initialCanvasState}>
                    <CanvasPanel p="4" width="300px" bg="#333" color="white" name="left">
                        {() => <>Hello world!</>}
                    </CanvasPanel>
                    <CanvasPanel name="afterLeft" p="4" bg="#444" color="white" isVisible={false}>
                        {() => <>Mini</>}
                    </CanvasPanel>
                    <CanvasPanel name="main">
                        {() => (
                            <>
                                <Navigation>
                                    <Navigation.Primary alignItems="center">
                                        <CanvasContext.Consumer>
                                            {({ togglePanel }) => {
                                                return (
                                                    <Box mr="2">
                                                        <MenuIcon
                                                            color="red"
                                                            title="Overlay"
                                                            onClick={() => {
                                                                togglePanel('afterLeft');
                                                            }}
                                                        />
                                                    </Box>
                                                );
                                            }}
                                        </CanvasContext.Consumer>
                                        <Logo />
                                        <CanvasContext.Consumer>
                                            {({ togglePanel }) => {
                                                return (
                                                    <Box mr="2">
                                                        <MenuIcon
                                                            title="Overlay"
                                                            onClick={() => {
                                                                togglePanel('right');
                                                            }}
                                                        />
                                                    </Box>
                                                );
                                            }}
                                        </CanvasContext.Consumer>
                                    </Navigation.Primary>

                                    <Navigation.Secondary display={{ _: 'none', lg: 'flex' }}>
                                        <InputGroup>
                                            <InputLeftElement>
                                                <Icon name="search" color="gray.300" />
                                            </InputLeftElement>
                                            <Input
                                                width="300px"
                                                icon="search"
                                                borderRadius="5px"
                                                bg="gray.50"
                                                border="1px solid"
                                                borderColor="#ddd"
                                                height="2.5rem"
                                                size="sm"
                                                placeholder="Here is a sample placeholder"
                                            />
                                        </InputGroup>
                                    </Navigation.Secondary>

                                    <Navigation.Tertiary>
                                        <UserDropdown />
                                    </Navigation.Tertiary>
                                </Navigation>
                            </>
                        )}
                    </CanvasPanel>
                    <CanvasPanel name="right" p="4" bg="#444" color="white" isVisible={false}>
                        {() => <>Mini</>}
                    </CanvasPanel>
                </CanvasContainer>
            </ThemeProvider>
        </HelmetProvider>
    );
}

ReactDOM.render(<StyleGuide />, document.getElementById('root'));
