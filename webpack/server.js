process.env['BABEL_ENV'] = 'server';

const createConfig = require('@audentio/kinetic/webpack/server');
const extendConfig = require('./common');

const config = createConfig();

extendConfig(config);

config.name = 'server';

module.exports = config;
