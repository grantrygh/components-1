import UploadIcon from 'mdi-react/UploadIcon';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box } from '../Box';
import { PseudoBox } from '../PseudoBox';
import { Text } from '../Text';
import useDropzoneStyle from './styles';
import { DropzoneProps } from './types';

export const Dropzone = (props: DropzoneProps) => {
    const {
        disabled,
        disabledMessage,
        uploadMessage = 'Drag or click to upload images',
        accept = [],
        showIcon = true,
        ...rest
    } = props;

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            acceptedFiles.forEach(file => {
                const fileUrl = window?.URL.createObjectURL(file);
                props.dropEvent(file, fileUrl);
            });
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        onDrop,
        accept: accept && accept.toString(),
        disabled,
    });

    const dropzoneStyleProps = useDropzoneStyle({
        state: (isDragAccept && 'accept') || (isDragReject && 'reject') || (isDragActive && 'active'),
        disabled,
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
            {showIcon && (
                <Box mb="spacing-xs">
                    <UploadIcon />
                </Box>
            )}
            <Text color="faintText">{content}</Text>
        </PseudoBox>
    );
};
