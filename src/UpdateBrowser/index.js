/** @jsx jsx */
import { jsx } from '@emotion/core';
import Box from '../Box';
import Button from '../Button';
import { useColorMode } from '../ColorModeProvider';
import Heading from '../Heading';
import Image from '../Image';
import Link from '../Link';
import Text from '../Text';
import chrome_logo from './assets/chrome.png';
import edge_logo from './assets/edge.png';
import firefox_logo from './assets/firefox.png';
import opera_logo from './assets/opera.png';

const UpdateBrowser = ({ onClick, href, children, ...props }) => {
    const { colorMode } = useColorMode();

    const colorModeStyles = {
        light: {
            bg: 'white',
            shadow: '0 7px 14px 0 rgba(0,0,0, 0.1), 0 3px 6px 0 rgba(0, 0, 0, .07)',
        },
        dark: {
            bg: 'gray.700',
            shadow: `rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px`,
        },
    };

    const boxStyleProps = {
        ...colorModeStyles[colorMode],
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        textAlign: 'center',
        display: 'table',
    };

    const browserBoxStyle = {
        bg: 'gray.50',
        padding: '32px',
        margin: '16px',
        height: '175px',
        width: '200px',
        textAlign: 'center',
        display: 'inline-block',
    };

    const browsers = [
        {
            name: 'Google Chrome',
            href: 'https://www.google.com/chrome',
            logo: chrome_logo,
        },
        {
            name: 'Mozilla Firefox',
            href: 'https://www.mozilla.org/firefox/new',
            logo: firefox_logo,
        },
        {
            name: 'Microsoft Edge',
            href: 'https://www.microsoft.com/edge',
            logo: edge_logo,
        },
        {
            name: 'Opera',
            href: 'https://www.opera.com',
            logo: opera_logo,
        },
    ];

    // Component is served to legacy browsers. IE6-8, for example, doesn't support rem units, so use px for UpdateBrowser.
    return (
        <Box {...boxStyleProps}>
            <Box display="table-cell" verticalAlign="middle">
                <Heading fontSize="xl" lineHeight="48px">
                    Please update your browser.
                </Heading>
                <Heading fontSize="sm">
                    Your browser isn't supported anymore. Update it to get the best experience and access to our latest
                    features.
                </Heading>
                <Box w="100%" maxWidth="992px" margin="16px auto" textAlign="center">
                    {browsers.map(browser => (
                        <Link {...browserBoxStyle} href={browser.href} key={browser.name}>
                            <Image htmlWidth="70px" src={browser.logo} margin="0 auto 10px" />
                            <Text>{browser.name}</Text>
                        </Link>
                    ))}
                </Box>
                <Box w="100%" float="left">
                    <Button href={href} onClick={onClick} bg="blue.500" color="white">
                        Remind me later
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

UpdateBrowser.displayName = 'UpdateBrowser';

export default UpdateBrowser;
