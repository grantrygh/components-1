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

module.exports = ({ config, mode }) => {
    const { css, scss, js } = loaders;

    config.module.rules.push({
        test: /\.stories\.tsx?$/,
        loaders: [
            {
                loader: require.resolve('@storybook/source-loader'),
                // options: { parser: 'typescript' },
            },
        ],
        enforce: 'pre',
    });

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

    config.resolve.extensions.push('.ts', '.tsx');
    return config;
};
