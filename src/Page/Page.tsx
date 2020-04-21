import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box } from '../Box';
import usePageStyle from './styles';

export const Page = props => {
    const { title, children } = props;

    const pageStyleProps = usePageStyle({});

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Box {...pageStyleProps}>{children}</Box>
        </>
    );
};
