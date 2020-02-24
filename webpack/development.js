process.env['BABEL_ENV'] = 'client';

const createConfig = require('@audentio/kinetic/webpack/development.ts');
const AutoDllPlugin = require('autodll-webpack-plugin');
const extendConfig = require('./common');
const { DEVTOOL, PROFILING } = require('../../config/application');

const config = createConfig();

extendConfig(config);

if (!PROFILING) {
    config.output.pathinfo = false;
    config.plugins.push(
        new AutoDllPlugin({
            devtool: DEVTOOL,
            filename: '[name].dll.js',
            entry: {
                vendor: [
                    'react',
                    'react-dom',
                    'react-helmet-async',
                    'react-router-dom',
                    'lodash',
                    'sockjs-client',
                    'sockjs-client/dist/sockjs.js',
                    'html-entities',
                    'yup',
                    'date-fns',
                ],
            },
        })
    );
}

// config.devServer.allowedHosts = [DEV_HOSTNAME];
config.devServer.overlay = true;

module.exports = Object.assign(config, {
    devtool: DEVTOOL,
});
