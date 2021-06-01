const path = require('path');

module.exports = {
    future: {
        webpack5: true,
    },
    experimental: {
        externalDir: true,
    },
    webpack: config => {
        // make sure only one instance of react is used
        // in some cases you can end up with multiple copies of react and get invalid hook call errors
        const newconfig = {
            ...config,
            resolve: {
                ...config.resolve,
                alias: {
                    ...config.resolve?.alias,
                    react: path.resolve(__dirname, 'node_modules/react'),
                    'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
                },
            },
        };

        return newconfig;
    },
};
