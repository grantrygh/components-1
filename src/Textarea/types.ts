import { InputProps } from '../Input/types';

export type TextareaProps = InputProps<HTMLTextAreaElement>;

interface IExpandingTextarea {
    onInput?: (event) => void;
}

export type ExpandingTextareaProps = IExpandingTextarea & TextareaProps;
