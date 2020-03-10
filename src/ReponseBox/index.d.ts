import * as React from 'react';

type ResponseBoxProps = {
    onSubmit: (value) => void;
    onCancel?: (value) => void;
};

declare const ResponseBox: React.FC<ResponseBoxProps>;
export default ResponseBox;
