import { BoxProps } from '../Box/types';

export type TextProps = BoxProps & {
    kind?: 'body' | 'faint';
};
