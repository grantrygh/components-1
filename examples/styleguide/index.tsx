import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Box, CSSReset, Flex, Heading, theme, ThemeProvider } from '../../src';

function StyleGuide(props) {
    return (
        <HelmetProvider>
            <ThemeProvider theme={{ ...theme, fonts: { ...theme.fonts, heading: 'Roboto', body: 'Roboto' } }}>
                <CSSReset />

                <Helmet>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Vollkorn:ital,wght@0,400;0,600;1,400;1,600&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Muli:wght@300;400;700&display=swap"
                        rel="stylesheet"
                    />
                </Helmet>

                <Box p={1} height="100vh" bg="blue.900">
                    <Flex flexDirection="row">
                        <Box width="100%" bg="white" p={10} m={4}>
                            <Heading kind="h5" mb="2">
                                Typography Scale
                            </Heading>

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
