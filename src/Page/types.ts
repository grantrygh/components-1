import * as React from 'react';

export interface IPage {
    // meta information
    title?: string;

    children?: React.ReactNode;
}
export type PageProps = IPage;
