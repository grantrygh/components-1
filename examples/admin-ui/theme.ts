import update from 'immutability-helper';
import { alertStyle } from '../../src/Alert/styles';
import { theme as defaultTheme } from '../../src/theme';

export default {
    ...defaultTheme,

    styles: {
        ...defaultTheme['styles'],
        alert: (props, theme) =>
            update(alertStyle(props, theme), {
                variants: {
                    subtle: { bg: { $set: '#eee' } },
                    leftAccent: { borderLeft: { $set: '2px solid' } },
                },
            }),
    },
};
