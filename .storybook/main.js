const { loaders } = require('../webpack/common');
const PATHS = require('../webpack/paths');

const file_loaders = [
    // Images & Videos
    {
        test: /\.(gif|svg|mp4|gif)$/i,
        loader: 'file-loader',
    },

    // webfonts
    {
        test: /\.(woff|woff2|ttf|eot|webfont.svg)(\?v=[\S]+)?$/,
        loader: 'file-loader',
    },

    // graphql
    {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
    },
];

module.exports = {
    stories: ['../src/**/stories.tsx'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-actions/register',
        '@storybook/addon-storysource/register',
        '@storybook/addon-viewport/register',
    ],
    babel: async (options) => {
        return {
            ...options,
            presets: [...options.presets, require.resolve('next/babel')],
            plugins: [...options.plugins, require.resolve('@emotion/babel-plugin')],
        };
    },
    webpackFinal: (config) => {
        const { css, scss, js } = loaders;

        // responsive images
        config.module.rules.unshift({
            test: /\.(jpe?g|png)$/i,
            loader: 'responsive-loader',
            options: {
                // we'll use jimp until build perf becomes a problem
                // adapter: require('responsive-loader/sharp'),
            },
        });

        config.resolve.modules.push(PATHS.base);

        // config.module.rules.push(css({ __DEV__: true, useStyleLoader: true, __BROWSER__: true }));
        config.module.rules.push(scss({ __DEV__: true, useStyleLoader: true, __BROWSER__: true }));

        config.module.rules.push(js);
        config.module.rules = config.module.rules.concat(file_loaders);

        return { ...config };
    },
};
