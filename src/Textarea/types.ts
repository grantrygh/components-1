import { InputProps } from '../Input/types';

export type TextareaProps = InputProps<HTMLTextAreaElement>;

type IExpandingTextarea = {
    onInput?: (event) => void;
};

export type ExpandingTextareaProps = IExpandingTextarea & TextareaProps;
