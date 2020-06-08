/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Box } from 'Box';
import { forwardRef } from 'react';
import ReactSelect from 'react-select';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';
import CreatableSelect from 'react-select/creatable';
import { useFormField } from '../Form';
import useSelectStyle from './styles';
import { SelectProps } from './types';

const renderSelect = (props, ref) => {
    const { loadOptions, onCreateOption, id, ...rest } = props;

    if (loadOptions && onCreateOption) {
        return (
            <AsyncCreatableSelect
                inputId={props.id}
                loadOptions={loadOptions}
                onCreateOption={onCreateOption}
                ref={ref}
                {...rest}
            />
        );
    }

    if (loadOptions) {
        return <AsyncSelect inputId={props.id} loadOptions={loadOptions} ref={ref} {...rest} />;
    }

    if (onCreateOption) {
        return <CreatableSelect inputId={props.id} onCreateOption={onCreateOption} ref={ref} {...rest} />;
    }

    return <ReactSelect inputId={props.id} ref={ref} {...rest} visible open />;
};

export const Select = forwardRef((props: SelectProps, ref) => {
    const { onChange: formOnChange, value: initialSelectValue } = useFormField(props);
    const { size = 'md', options = [], border = 'full' } = props;

    // optionally allow custom onChange event along with passed Form onChange
    const hasOnChange = props.onChange || (formOnChange && typeof formOnChange === 'function');
    const onChange = e => {
        if (formOnChange && typeof formOnChange === 'function') {
            formOnChange(e, e.constructor === Array ? e.map(v => v.value) : e.value);
        }
        if (props.onChange) {
            props.onChange(e);
        }
    };

    const { root: selectStyleProps, theme: selectTheme } = useSelectStyle({
        size,
        border,
    });

    // Handle default value
    let defaultSelectValue = null;
    options.forEach(o => {
        if (o.value && o.value === initialSelectValue) {
            defaultSelectValue = o;
        } else if (o.options) {
            const v = o.options.filter(opt => opt.value === initialSelectValue);
            if (v.length > 0) {
                defaultSelectValue = v;
            }
        }
    });

    const selectProps = {
        ...props,
        onChange: hasOnChange && onChange,
        styles: selectStyleProps,
        defaultValue: defaultSelectValue,
        theme: theme => ({
            ...theme,
            ...selectTheme.root,
            colors: {
                ...theme.colors,
                ...selectTheme.colors,
            },
            spacing: {
                ...theme.spacing,
                ...selectTheme.spacing,
            },
        }),
    };

    return <Box>{renderSelect(selectProps, ref)}</Box>;
});
