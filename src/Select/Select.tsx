/** @jsx jsx */
import { jsx } from '@emotion/core';
import { forwardRef } from 'react';
import ReactSelect from 'react-select';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';
import CreatableSelect from 'react-select/creatable';
import Box from '../Box';
import { useFormField } from '../Form';
import { SelectProps } from './types';

const renderSelect = (props, ref) => {
    const { loadOptions, onCreateOption } = props;

    if (loadOptions && onCreateOption) {
        return <AsyncCreatableSelect loadOptions={loadOptions} onCreateOption={onCreateOption} ref={ref} {...props} />;
    }

    if (loadOptions) {
        return <AsyncSelect loadOptions={loadOptions} ref={ref} {...props} />;
    }

    if (onCreateOption) {
        return <CreatableSelect onCreateOption={onCreateOption} ref={ref} {...props} />;
    }

    return <ReactSelect ref={ref} {...props} visible open />;
};

export const Select = forwardRef((props: SelectProps, ref) => {
    const { onChange: formOnChange } = useFormField(props);

    // optionally allow custom onChange event along with passed Form onChange
    const hasOnChange = props.onChange || (formOnChange && typeof formOnChange === 'function');
    const onChange = v => {
        if (formOnChange && typeof formOnChange === 'function') {
            formOnChange(v);
        }
        if (props.onChange) {
            props.onChange(v);
        }
    };

    const selectProps = {
        ...props,
        onChange: hasOnChange && onChange,
    };

    return <Box position="relative">{renderSelect(selectProps, ref)}</Box>;
});
