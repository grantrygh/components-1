const webpackConfig = require('./webpack.config.js');

module.exports = {
    stories: ['../src/Box/examples.tsx'],
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
        webpackConfig;
        return { ...config };
    },
};
