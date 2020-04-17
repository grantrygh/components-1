import HomeIcon from 'mdi-react/HomeIcon';
import MenuIcon from 'mdi-react/MenuIcon';
import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
    Accordion,
    AccordionHeader,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Avatar,
    Badge,
    Box,
    CSSReset,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    Navigation,
    Text,
    theme,
    ThemeProvider,
    UserDropdown,
} from '../../src';
import { CanvasContainer, CanvasContext, CanvasPanel } from '../../src/Canvas';
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
                    <CanvasPanel p="canvas.spacing" width="canvas.width" bg="canvasBg" name="left">
                        {() => (
                            <>
                                <Navigation.Item href="/" exact>
                                    <Navigation.ItemMedia icon={HomeIcon} />
                                    <Navigation.ItemText>Home</Navigation.ItemText>
                                </Navigation.Item>
                                <Navigation.Item>
                                    <Accordion allowToggle>
                                        <AccordionItem>
                                            <AccordionHeader>
                                                <Navigation.Item href="/shop" exact={false} mb={0}>
                                                    <Navigation.ItemMedia icon={HomeIcon} />
                                                    <Navigation.ItemText>Shop</Navigation.ItemText>
                                                </Navigation.Item>
                                                <AccordionIcon />
                                            </AccordionHeader>
                                            <AccordionPanel>
                                                <Navigation.Item href="/shop/sales" isSubmenuItem>
                                                    <Navigation.ItemMedia />
                                                    <Navigation.ItemText>Sales</Navigation.ItemText>
                                                    <Navigation.ItemMeta>
                                                        <Text>37</Text>
                                                    </Navigation.ItemMeta>
                                                </Navigation.Item>
                                            </AccordionPanel>
                                            <AccordionPanel>
                                                <Navigation.Item href="/shop/products" isSubmenuItem>
                                                    <Navigation.ItemMedia />
                                                    <Navigation.ItemText>Product List</Navigation.ItemText>
                                                    <Navigation.ItemMeta>8</Navigation.ItemMeta>
                                                </Navigation.Item>
                                            </AccordionPanel>
                                        </AccordionItem>
                                    </Accordion>
                                </Navigation.Item>
                                <Navigation.Item>
                                    <Navigation.ItemMedia>
                                        <Avatar size="sm" name="Uchiha Itachi" src="https://bit.ly/uchiha-itachi" />
                                    </Navigation.ItemMedia>
                                    <Navigation.ItemText>Uchiha Itachi</Navigation.ItemText>
                                    <Navigation.ItemMeta>
                                        <Badge variant="solid" variantColor="error">
                                            3
                                        </Badge>
                                    </Navigation.ItemMeta>
                                </Navigation.Item>
                            </>
                        )}
                    </CanvasPanel>
                    <CanvasPanel name="afterLeft" p="canvas.spacing" bg="navBg" isVisible={false}>
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
                                        <InputGroup mb={0}>
                                            <InputLeftElement>
                                                <Icon name="search" color="gray.300" />
                                            </InputLeftElement>
                                            <Input bg="gray.50" size="md" placeholder="Search..." />
                                        </InputGroup>
                                    </Navigation.Secondary>

                                    <Navigation.Tertiary>
                                        <UserDropdown />
                                    </Navigation.Tertiary>
                                </Navigation>
                            </>
                        )}
                    </CanvasPanel>
                    <CanvasPanel name="right" p="canvasSpacing" bg="navBg" isVisible={false}>
                        {() => <>Mini</>}
                    </CanvasPanel>
                </CanvasContainer>
            </ThemeProvider>
        </HelmetProvider>
    );
}

ReactDOM.render(<StyleGuide />, document.getElementById('root'));
