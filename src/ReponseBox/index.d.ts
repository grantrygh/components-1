import * as React from 'react';

type ResponseBoxProps = {
    onChange?: any;
    onSubmit?: any;
    ref?: any;
    value?: any;
    isFetching?: boolean;
    errors?: Array<String>;
};

const ResponseBox: React.FC<ResponseBoxProps>;
export default ResponseBox;
