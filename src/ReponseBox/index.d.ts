import * as React from 'react';

type ResponseBoxProps = {
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onSubmit?: (value) => void;
    ref?: React.RefObject<HTMLElement>;
    value?: {
        message: string;
    };
    isFetching?: boolean;
    errors?: Array<String>;
};

declare const ResponseBox: React.FC<ResponseBoxProps>;
export default ResponseBox;
