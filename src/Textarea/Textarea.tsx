/** @jsx jsx */
import { jsx } from '@emotion/core';
import { forwardRef, RefObject, useLayoutEffect, useRef, useState } from 'react';
import { Input } from '../Input';
import useTextareaStyle from './styles';
import { ExpandingTextareaProps, TextareaProps } from './types';

export const Textarea = forwardRef((props: TextareaProps, ref) => {
    const textareaStyleProps = useTextareaStyle({});
    return <Input ref={ref} as="textarea" {...textareaStyleProps} {...props} />;
});

export const ExpandingTextarea = forwardRef(
    ({ minHeight = '40px', onInput, ...props }: ExpandingTextareaProps, ref: RefObject<HTMLTextAreaElement>) => {
        const [height, setHeight] = useState(null);
        const ownRef = useRef<HTMLTextAreaElement>();

        const textareaRef = ref || ownRef;

        useLayoutEffect(() => {
            if (textareaRef.current) {
                setHeight(textareaRef.current.scrollHeight);
            }
        }, [textareaRef]);

        const handleInput = event => {
            if (textareaRef.current) {
                setTimeout(() => {
                    // setHeight('auto');
                    setHeight(textareaRef.current.scrollHeight);
                }, 0);
            }
            if (onInput) {
                onInput(event);
            }
        };

        return (
            <Textarea
                onInput={handleInput}
                css={{
                    height: height || 0,
                    resize: 'none',
                    overflow: 'hidden',
                    minHeight: minHeight as string,
                }}
                ref={textareaRef}
                {...props}
            />
        );
    }
);
