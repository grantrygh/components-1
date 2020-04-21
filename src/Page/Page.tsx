import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box } from '../Box';
import usePageStyle from './styles';

export const Page = props => {
    const { title, children } = props;

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {children}
        </>
    );
};

export const PageContent = props => {
    const { children } = props;
    const { content: contentStyleProps } = usePageStyle({});
    return (
        <Box as="main" role="main" {...contentStyleProps}>
            {children}
        </Box>
    );
};

export const PageFooter = props => {
    const { children } = props;
    const { footer: footerStyleProps } = usePageStyle({});
    return (
        <Box as="footer" {...footerStyleProps}>
            {children}
        </Box>
    );
};
