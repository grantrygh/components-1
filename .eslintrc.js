module.exports = {
    extends: ['next'],
    rules: {
        'dot-notation': ['off'],
        'max-lines': 'warn',
        'jsx-a11y/media-has-caption': ['off'],
        'react/jsx-props-no-spreading': ['off'],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'off',
        'react/display-name': ['off'],
        'no-use-before-define': ['error', { functions: false }],
        'no-console': 'warn',
    },
    overrides: [
        // {
        //     files: '*.js',
        //     rules: {
        //         'no-console': 'off',
        //     },
        // },
    ],
};
