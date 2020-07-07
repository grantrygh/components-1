import { ThemeContext } from '@emotion/core';
import styled from '@emotion/styled';
import React, { forwardRef, useContext } from 'react';
import { Box } from '../Box';
import { IconProps } from './types';

const Svg = styled(Box)`
    flex-shrink: 0;
    backface-visibility: hidden;
    &:not(:root) {
        overflow: hidden;
    }
`;

// TODO: switch Icons to use mdi-react by default
export const Icon = forwardRef(
    (
        { size = '4', name, color = 'currentColor', role = 'presentation', focusable = false, ...rest }: IconProps,
        ref: any
    ) => {
        const { icons: iconPaths } = useContext<{ icons?: any }>(ThemeContext);

        // Fallback in case you pass the wrong name
        const iconFallback = iconPaths['question-outline'];

        const path = iconPaths[name] == null ? iconFallback.path : iconPaths[name].path;

        const viewBox = (iconPaths[name] == null ? iconFallback.viewBox : iconPaths[name].viewBox) || '0 0 24 24';

        return (
            <Svg
                ref={ref}
                as="svg"
                size={size}
                color={color}
                display="inline-block"
                verticalAlign="middle"
                viewBox={viewBox}
                focusable={focusable}
                role={role}
                {...rest}
            >
                {path}
            </Svg>
        );
    }
);
