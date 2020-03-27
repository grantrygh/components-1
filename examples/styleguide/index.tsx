import MenuIcon from 'mdi-react/MenuIcon';
import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
    Alert,
    AlertDescription,
    AlertIcon,
    Box,
    CSSReset,
    Flex,
    Heading,
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

                <CanvasContainer initialState={{ left: false, main: true }}>
                    <CanvasPanel name="left" bg="#222" color="#eee" p="3" width="200px">
                        Left CanvasPanel
                    </CanvasPanel>

                    <CanvasPanel name="main" flex="1">
                        <Navigation>
                            <Navigation.Primary alignItems="center">
                                <CanvasContext.Consumer>
                                    {({ canvasState, toggleCanvas }) => {
                                        return (
                                            <Box mr="2">
                                                <MenuIcon
                                                    onClick={() => {
                                                        toggleCanvas('left');
                                                    }}
                                                />
                                            </Box>
                                        );
                                    }}
                                </CanvasContext.Consumer>
                                <Logo />
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

                        <Flex flexDirection="row">
                            <Box width="100%" bg="white" p={10} m={4}>
                                <Alert variant="leftAccent" status="success" maxWidth="sm" alignItems="start" mb={4}>
                                    <AlertIcon />
                                    <AlertDescription>Something just happened!</AlertDescription>
                                </Alert>
                                {/* <Heading kind="h5" mb="2">
                                    Typography Scale
                                </Heading> */}

                                {/* <Heading kind="subtitle">
                                    Root = 16px (1rem) &nbsp;&nbsp;&nbsp; Scale Ratio = 1.25
                                </Heading> */}

                                <Heading kind="h1">H1 Headline</Heading>
                                <Heading kind="h2">H2 Headline</Heading>
                                <Heading kind="h3">H3 Headline</Heading>

                                <Box maxWidth="600px" as="p" mb="3">
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                                    doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                                    veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                </Box>
                                <Box maxWidth="600px" as="p">
                                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                                    consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
                                    quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
                                    sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam
                                    quaerat voluptatem.
                                </Box>
                            </Box>
                        </Flex>
                    </CanvasPanel>
                </CanvasContainer>
            </ThemeProvider>
        </HelmetProvider>
    );
}

ReactDOM.render(<StyleGuide />, document.getElementById('root'));
