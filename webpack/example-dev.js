process.env['BABEL_ENV'] = 'client';

/* eslint-disable global-require, import/no-dynamic-require */

const path = require('path');
const helmet = require('helmet');
const ejs = require('ejs');
const fs = require('fs');
const { resolve } = require('path');
const express = require('express');
const webpack = require('webpack');
const PATHS = require('./paths');
const { createWebpackConfig } = require('./common');

const createConfig = (options = {}) =>
    createWebpackConfig(
        {
            __DEV__: true,
            __BROWSER__: true,
            useStyleLoader: true,
            ...options,
        },
        {
            mode: 'development',

            // eval doesnt play nice with react error boundries
            // also required for vscode debugger
            devtool: 'eval-source-map',

            entry: path.join(PATHS.base, `examples/${process.env.EXAMPLE}/index.tsx`),

            context: resolve(process.cwd(), 'src'),

            plugins: [
                // Enable HMR
                new webpack.HotModuleReplacementPlugin(),
            ],

            watchOptions: {
                ignored: /node_modules/,
            },

            devServer: {
                hot: true,

                port: 5000,

                // Accessible from local network
                host: '0.0.0.0',

                // All paths render index.html
                historyApiFallback: true,

                after(app) {
                    const config = {};

                    // Serve files from /dist and /assets
                    app.use('/dist', express.static(path.join(PATHS.dist, 'client')));
                    app.use('/assets', express.static(PATHS.assets));

                    app.get('*', (req, res) => {
                        const indexTemplate = fs.readFileSync(
                            path.join(PATHS.base, 'examples/template.dev.ejs'),
                            'utf8'
                        );

                        res.send(
                            ejs.render(indexTemplate, {
                                public_config: JSON.stringify(config),
                                nonce: res.locals.nonce,
                            })
                        );
                    });
                },

                // Reduce console noise
                stats: {
                    chunks: false,
                    chunkModules: false,
                    modules: false,
                    chunkOrigins: false,
                    colors: true,
                    version: true,
                    assets: false,
                    cachedAssets: false,
                    warningsFilter: warning => warning.indexOf('Critical dependency') > -1,
                },
            },
        }
    );

// const AutoDllPlugin = require('autodll-webpack-plugin');

const config = createConfig();

// if (!PROFILING) {
//     config.output.pathinfo = false;
//     config.plugins.push(
//         new AutoDllPlugin({
//             devtool: DEVTOOL,
//             filename: '[name].dll.js',
//             entry: {
//                 vendor: [
//                     'react',
//                     'react-dom',
//                     'react-helmet-async',
//                     'react-router-dom',
//                     'lodash',
//                     'sockjs-client',
//                     'sockjs-client/dist/sockjs.js',
//                     'html-entities',
//                     'yup',
//                     'date-fns',
//                 ],
//             },
//         })
//     );
// }

// config.devServer.allowedHosts = [DEV_HOSTNAME];
config.devServer.overlay = true;

module.exports = Object.assign(config, {
    devtool: 'eval-source-map',
});
