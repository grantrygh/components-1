process.env['BABEL_ENV'] = 'client';

const createConfig = require('@audentio/kinetic/webpack/client');
const extendConfig = require('./common');

const config = createConfig();

extendConfig(config);

config.name = 'client';

module.exports = config;
