import * as React from 'react';
import { BoxProps } from '../Box';

interface IDropzone {
    // event handler when a file is dropped
    dropEvent: (file?: File) => Promise<void>;

    // disable dropzone events
    disabled?: boolean;

    // allow custom disabled and upload text
    disabledMessage?: string;
    uploadMessage?: string;

    // Array of accepted file extensions
    // ie.:  image/jpeg, .png, image/*, .xls
    accept?: Array<String>;
}

export type DropzoneProps = IDropzone & BoxProps;

declare const Dropzone: React.FC<DropzoneProps>;

export default Dropzone;
