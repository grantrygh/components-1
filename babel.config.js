/* eslint-disable no-template-curly-in-string */

const preset_env_config = {
    // exclude: ['transform-regenerator', 'transform-async-to-generator'],
    // useBuiltIns: 'usage',
    targets: {
        esmodules: true,
    },
    modules: false,
    loose: true,
};

const default_presets = () => [
    ['@babel/preset-env', preset_env_config],
    '@babel/preset-react',
    '@babel/preset-typescript',
];

const server_presets = () => [
    [
        '@babel/preset-env',
        {
            ...preset_env_config,
            targets: {
                node: 'current',
            },
        },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
];

const test_presets = () => [['@babel/preset-env'], '@babel/preset-react'];

const plugins = () => [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    '@babel/plugin-syntax-dynamic-import',
    [
        'transform-imports',
        {
            lodash: {
                transform: 'lodash/${member}',
                preventFullImport: true,
            },
            components: {
                transform: 'components/${member}',
                preventFullImport: true,
            },
            src_components: {
                transform: 'src/components/${member}',
                preventFullImport: true,
            },
            utils: {
                transform: 'utils/${member}',
                preventFullImport: true,
            },
            src_utils: {
                transform: 'src/utils/${member}',
                preventFullImport: true,
            },
        },
    ],
];

module.exports = {
    presets: default_presets(),
    plugins: plugins(),
    env: {
        test: {
            presets: test_presets(),
        },
        server: {
            presets: server_presets(),
        },
    },
};
