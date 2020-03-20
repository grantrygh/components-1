import React, { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import PseudoBox from '../PseudoBox';
import Text from '../Text';

const container = {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '125px',
    padding: 8,
    borderWidth: '2px',
    borderRadius: '4px',
    borderColor: 'gray.400',
    borderStyle: 'dashed',
    transition: 'border 0.24s ease-in-out',
    width: '100%',
};

const textStyle = {
    maxWidth: '300px',
    margin: 4,
    textAlign: 'center',
    color: 'gray.400',
};

const Dropzone = props => {
    const {
        disabled,
        disabledMessage,
        uploadMessage = 'Drag a file here to upload, or click to select a file.',
        accept = [],
        ...rest
    } = props;

    // TODO: replace with theme colors
    const variables = {
        color_info: 'blue.400',
        color_success: 'green.400',
        color_danger: 'red.400',
    };

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles && acceptedFiles[0]) {
            props.dropEvent(acceptedFiles[0]);
        }
    }, []);

    const activeStyle = {
        borderColor: variables.color_info,
    };

    const acceptStyle = {
        borderColor: variables.color_success,
    };

    const rejectStyle = {
        borderColor: variables.color_danger,
    };

    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        onDrop,
        accept: accept && accept.toString(),
        disabled,
    });

    const styleDiv = useMemo(
        () => ({
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isDragActive, isDragReject]
    );

    const activeProp = { ...getRootProps({ styleDiv }).styleDiv };

    let content = <Text {...textStyle}>{uploadMessage}</Text>;

    if (disabled && disabledMessage) {
        content = <Text {...textStyle}>{disabledMessage}</Text>;
    } else if (isDragActive) {
        content = <Text {...textStyle}>Drop the file here ...</Text>;
    }

    return (
        // container
        <PseudoBox
            {...getRootProps()}
            {...container}
            disabled={disabled}
            _hover={
                !disabled && {
                    cursor: 'pointer',
                    borderColor: 'blue.400',
                }
            }
            {...activeProp}
            {...rest}
        >
            <input {...getInputProps()} />
            {content}
        </PseudoBox>
    );
};

export default Dropzone;
