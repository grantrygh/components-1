import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Flex } from '../../../../src';
import { Header } from '../Header';

// Defined at project level to fully support custom page layouts

const contentStyle = {
    p: 'spacing',
    flex: 1,
    bg: 'pageBg',
};

export interface IPage {
    // meta information
    title?: string;

    // use a transparent header background style
    transparent?: boolean;

    children?: React.ReactNode;
}

export const Page = (props: IPage) => {
    const { title, transparent, children } = props;

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>

            {/* Header */}
            <Header title={title} transparent={transparent} />

            <Flex direction="column" overflowY="auto" h="100%">
                {/* Main */}
                <PageContent>{children}</PageContent>

                {/* Footer */}
                <PageFooter>Footer</PageFooter>
            </Flex>
        </>
    );
};

const PageContent = props => {
    const { children } = props;
    return (
        <Box as="main" role="main" {...contentStyle}>
            {children}
        </Box>
    );
};

const PageFooter = props => {
    const { children } = props;
    return <Box as="footer">{children}</Box>;
};
