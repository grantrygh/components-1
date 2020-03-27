import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import PseudoBox from '../PseudoBox';
import Text from '../Text';
import useDropzoneStyle, { useDropzoneTextStyle } from './styles';
import { DropzoneProps } from './types';

export const Dropzone = (props: DropzoneProps) => {
    const {
        disabled,
        disabledMessage,
        uploadMessage = 'Drag a file here to upload, or click to select a file.',
        accept = [],
        ...rest
    } = props;

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles && acceptedFiles[0]) {
            props.dropEvent(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        onDrop,
        accept: accept && accept.toString(),
        disabled,
    });

    const dropzoneStyleProps = useDropzoneStyle({
        state: (isDragAccept && 'accept') || (isDragReject && 'reject') || (isDragActive && 'active'),
        color: props.color,
        disabled,
    });

    const dropzoneTextStyleProps = useDropzoneTextStyle({
        color: props.color,
    });

    let content = uploadMessage;

    if (disabled && disabledMessage) {
        content = disabledMessage;
    } else if (isDragActive) {
        content = 'Drop the file here ...';
    }

    return (
        // container
        <PseudoBox {...getRootProps()} disabled={disabled} {...dropzoneStyleProps} {...rest}>
            <input {...getInputProps()} />
            <Text {...dropzoneTextStyleProps}>{content}</Text>
        </PseudoBox>
    );
};
