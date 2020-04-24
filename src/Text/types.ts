import { BoxProps } from '../Box/types';

export type TextProps = BoxProps & {
    kind?: 'small' | 'body' | 'large';
    state?: 'normal' | 'faint';
};
