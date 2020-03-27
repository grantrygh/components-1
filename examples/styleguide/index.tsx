import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
    Alert,
    AlertDescription,
    AlertIcon,
    Box,
    Button,
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

                <Box height="100vh" bg="#eee">
                    <Navigation mb={10}>
                        <Navigation.Primary>
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

                    <Navigation mb={10}>
                        <Navigation.Primary>
                            <Logo />
                        </Navigation.Primary>

                        <Navigation.Secondary display={{ _: 'none', lg: 'flex' }} justifyContent="center">
                            Nav - Links - Go - Here
                        </Navigation.Secondary>

                        <Navigation.Tertiary>
                            <Button variant="link">
                                <Icon size="3" name="add" mr={2} /> Call to action
                            </Button>
                        </Navigation.Tertiary>
                    </Navigation>

                    <Flex flexDirection="row">
                        <Box width="100%" bg="white" p={10} m={4}>
                            <Heading kind="h5" mb="2">
                                Typography Scale
                            </Heading>

                            <Alert mt="2" variant="leftAccent" status="success" maxWidth="sm" alignItems="start" mb={4}>
                                <AlertIcon />
                                <AlertDescription>Something just happened!</AlertDescription>
                            </Alert>

                            <Heading kind="subtitle">Root = 16px (1rem) &nbsp;&nbsp;&nbsp; Scale Ratio = 1.25</Heading>

                            <Heading kind="h1">H1 Headline</Heading>
                            <Heading kind="h2">H2 Headline</Heading>
                            <Heading kind="h3">H3 Headline</Heading>
                            <Heading kind="h4">H4 Headline</Heading>
                            <Heading kind="h5">H5 Headline</Heading>
                            <Heading kind="h6">H6 Headline</Heading>
                        </Box>

                        {/* <Box width="100%" bg="white" p={10} m={4}>
                            <Progress value={30} />

                            <Button mt={4} mr={2} variant="outline">
                                Outline
                            </Button>

                            <Button mt={4} mr={2} variant="solid">
                                Solid
                            </Button>
                        </Box> */}
                    </Flex>
                </Box>
            </ThemeProvider>
        </HelmetProvider>
    );
}

ReactDOM.render(<StyleGuide />, document.getElementById('root'));
