import { css, Global } from '@emotion/core';
import React from 'react';
import { tailwindPreflight } from './preflight';
import { CSSResetProps } from './types';

const defaultConfig = theme => ({
    color: theme.colors.gray[800],
    bg: undefined,
    borderColor: theme.colors.gray[200],
    placeholderColor: theme.colors.gray[400],
});

export const CSSReset = ({ config }: CSSResetProps) => {
    const configCSS = theme => {
        const _defaultConfig = defaultConfig(theme);

        const _config = config ? config(theme, _defaultConfig) : defaultConfig(theme);

        const { color, bg, borderColor, placeholderColor } = _config;

        return css`
            html {
                line-height: 1.5;
                color: ${color};
                background-color: ${bg};
            }

            body {
                font-family: ${theme.fonts.sans};
            }

            html,
            body,
            #root {
                width: 100%;
                height: 100%;
            }

            /**
            * Allow adding a border to an element by just adding a border-width.
            */
            *,
            *::before,
            *::after {
                border-width: 0;
                border-style: solid;
                border-color: ${borderColor};
            }

            input:-ms-input-placeholder,
            textarea:-ms-input-placeholder {
                color: ${placeholderColor};
            }

            input::-ms-input-placeholder,
            textarea::-ms-input-placeholder {
                color: ${placeholderColor};
            }

            input::placeholder,
            textarea::placeholder {
                color: ${placeholderColor};
            }
        `;
    };

    return <Global styles={theme => css([tailwindPreflight(theme), configCSS(theme)])} />;
};
