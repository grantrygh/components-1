import React, { forwardRef, RefObject } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Input } from '../Input';
import useTextareaStyle from './styles';
import { ExpandingTextareaProps, TextareaProps } from './types';

export const Textarea = forwardRef((props: TextareaProps, ref) => {
    const textareaStyleProps = useTextareaStyle({});
    return <Input ref={ref} as="textarea" {...textareaStyleProps} {...props} />;
});

export const ExpandingTextarea = forwardRef(
    ({ minHeight = '8rem', ...props }: ExpandingTextareaProps, ref: RefObject<HTMLTextAreaElement>) => {
        return (
            <Textarea
                as={TextareaAutosize}
                resize="none"
                overflow="hidden"
                minHeight={minHeight as string}
                {...props}
            />
        );
    }
);
