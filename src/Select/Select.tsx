import React, { forwardRef } from 'react';
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
    const { onChange: formOnChange, value: initialSelectValue, disabled } = useFormField(props);
    const { size = 'md', options = [], border = 'full' } = props;

    // optionally allow custom onChange event along with passed Form onChange
    const hasOnChange = props.onChange || (formOnChange && typeof formOnChange === 'function');
    const onChange = (e) => {
        if (formOnChange && typeof formOnChange === 'function') {
            formOnChange(e, e.constructor === Array ? e.map((v) => v.value) : e.value);
        }
        if (props.onChange) {
            props.onChange(e);
        }
    };

    const isInitialMulti = props.isMulti && Array.isArray(initialSelectValue);
    const { root: selectStyleProps, theme: selectTheme } = useSelectStyle({
        size,
        border,
        disabled,
    });

    // Handle default value
    let defaultSelectValue = null;
    if (props.isMulti) {
        defaultSelectValue = [];
    }

    options.forEach((o) => {
        if (
            (o.value && o.value === initialSelectValue) ||
            (isInitialMulti && initialSelectValue.indexOf(o.value) > -1)
        ) {
            if (isInitialMulti) {
                defaultSelectValue.push(o);
            } else {
                defaultSelectValue = o;
            }
        } else if (o.options) {
            const v = o.options.filter((opt) => {
                // when isMulti, handle initial form values of array types
                if (isInitialMulti && initialSelectValue.indexOf(opt.value) > -1) {
                    return true;
                }
                if (opt.value === initialSelectValue) {
                    return true;
                }
                return false;
            });
            if (v.length > 0) {
                if (isInitialMulti) {
                    defaultSelectValue = defaultSelectValue.concat(v);
                } else {
                    defaultSelectValue = v;
                }
            }
        }
    });

    const selectProps = {
        ...props,
        onChange: hasOnChange && onChange,
        styles: selectStyleProps,
        defaultValue: defaultSelectValue,
        isDisabled: disabled,
        theme: (theme) => ({
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

    return <React.Fragment>{renderSelect(selectProps, ref)}</React.Fragment>;
});
