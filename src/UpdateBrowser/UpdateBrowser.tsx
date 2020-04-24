/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Box } from '../Box';
import { Button } from '../Button';
import { Heading } from '../Heading';
import { Image } from '../Image';
import { Link } from '../Link';
import { Text } from '../Text';
import chrome_logo from './assets/chrome.png';
import edge_logo from './assets/edge.png';
import firefox_logo from './assets/firefox.png';
import opera_logo from './assets/opera.png';
import useUpdateBrowserStyle from './styles';
import { UpdateBrowserProps } from './types';

export const UpdateBrowser = ({ onClick, href, children, ...props }: UpdateBrowserProps) => {
    const { updateBrowserStyleProps, browserBoxStyleProps } = useUpdateBrowserStyle(null);

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
        <Box {...updateBrowserStyleProps}>
            <Box display="table-cell" verticalAlign="middle">
                <Heading kind="h2">Please update your browser.</Heading>
                <Text kind="large">
                    Your browser isn't supported anymore. Update it to get the best experience and access to our latest
                    features.
                </Text>
                <Box w="100%" maxWidth="992px" margin="16px auto" textAlign="center">
                    {browsers.map(browser => (
                        <Link {...browserBoxStyleProps} href={browser.href} key={browser.name}>
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
