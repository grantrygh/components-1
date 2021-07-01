import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React, { forwardRef } from 'react';
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
        const { icons: iconPaths } = useTheme();

        // Fallback in case you pass the wrong name
        const iconFallback = iconPaths['question-outline'];
        let icon = iconPaths[name];

        if (icon === null) {
            if (process.env.NODE_ENV === 'development') {
                console.warn(`Unknown icon ${name} passed to <Icon />`);
            }

            icon = iconFallback;
        }

        const path = icon.path;
        const viewBox = icon['viewBox'];

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
