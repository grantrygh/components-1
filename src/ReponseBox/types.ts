import { BoxProps } from '../Box/types';

export type ResponseBoxProps = BoxProps & {
    onSubmit: (value) => void;
    onCancel?: (value) => void;
};
