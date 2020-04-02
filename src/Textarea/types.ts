import { InputProps } from '../Input';

export type TextareaProps = InputProps<HTMLTextAreaElement>;

interface IExpandingTextarea {
    onInput?: (event) => void;
}

export type ExpandingTextareaProps = IExpandingTextarea & TextareaProps;
