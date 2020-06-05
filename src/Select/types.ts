import { SelectComponentsProps } from 'react-select/src/Select';
import { IInput } from '../Input/types';

// see https://react-select.com/props for full props list

export interface ISelect {
    // onChange - subscribe to change events
    // noOptionsMessage - ({ inputValue: string }) => string | null - Text to display when there are no options

    // options - specify the options the user can select from
    options?: Array<{ label: string; value?: string; options?: Array<{ value: any; label: string }> }>;

    id?: string;
    // name - generate an HTML input with this name, containing the current value.
    name?: string;

    // placeholder - change the text displayed when no option is selected
    placeholder?: string;
    // autoFocus - focus the control when it mounts
    autoFocus?: boolean;
    // isDisabled - disable the control
    isDisabled?: boolean;
    // isMulti - allow the user to select multiple values
    isMulti?: boolean;
    // isSearchable - allow the user to search for matching options
    isSearchable?: boolean;
    // isClearable - allow the user to clear the current selection
    isClearable?: boolean;

    onChange?: (v: { label: string; value: string }) => void;

    // value - control the current value
    value?: any;

    /**
     * Initial value inside a form
     */
    defaultValue?: Object | Array<Object> | null | undefined;

    /**
     * Function that returns a promise, which is the set of options to be used once the promise resolves.
     */
    loadOptions?: any;

    /**
     * If provided, this will be called with the input value when a new option is created,
     * and onChange will not be called.
     * Use this when you need more control over what happens when new options are created.
     *
     */
    onCreateOption?: (string) => void;

    filterOption?: Function;
    formatOptionLabel?: Function;

    size?: IInput['size'];
    isLoading?: boolean;

    label?: React.ReactNode;

    border?: 'full' | 'underline' | 'unstyled';
}

export type SelectProps = ISelect & SelectComponentsProps;
