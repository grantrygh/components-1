import { BoxProps } from '../Box/types';

interface IDropzone {
    // event handler when a file is dropped
    dropEvent: (file?: File, fileUrl?: string) => Promise<void> | void;

    // disable dropzone events
    disabled?: boolean;
    // optional color to set the default border color and text color
    color?: string;

    // allow custom disabled and upload text
    disabledMessage?: string;
    uploadMessage?: string;

    // Array of accepted file extensions
    // ie.:  image/jpeg, .png, image/*, .xls
    accept?: Array<String>;
}

export type DropzoneProps = IDropzone & BoxProps;
