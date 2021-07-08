import { AnySchema as Schema } from 'yup';
import { BoxProps } from '../Box/types';

export interface FormValue {
    [key: string]: any;
}

export type FormContextType = {
    fields: { [name: string]: Schema<any> };
    getFormValue: Function;
    getFieldValue: Function;
    onChange: Function;
    registerField: Function;
    clearForm: Function;
    getFormFieldError?: Function;
    deleteFormFieldError?: Function;
    formDisabled?: boolean;
    context?: any;
};

export interface FormFieldProps {
    name: string;

    /**
     *
     * Validation schema
     * not used directly by input. <Form> uses it for validation
     */
    schema?: Schema<any>;
}

export interface IForm {
    children: React.ReactNode;

    /**
     * __isFetching__
     *
     * Passes isFetching to all form fields (and submit button)
     * Input components need to handle fetch state
     */
    isFetching?: boolean;

    /**
     * __disabled__
     *
     * Passes isFetching to all form fields (buttons)
     * Input components need to handle disabled state
     */
    disabled?: boolean;

    /**
     * __value__
     *
     * Object that holds form data. Pass it to render controlled form.
     * If not passed, form will manage its own state
     */
    value?: FormValue;

    /**
     * __initialValue__
     *
     * Initial value for form. Only used at mount, does not get used once form is mounted
     * on mount it becomes form value
     */
    initialValue?: FormValue;

    /**
     * __onSubmit__
     *
     * @param {Object} value – form data object
     * @param {boolean} isValid - is form valid
     */
    onSubmit?: (e: any, arg: any) => void;

    autoComplete?: string;

    /**
     * __onReset__
     *
     * @param {Object} e – event object
     */
    onReset?: (e: React.FormEvent<HTMLFormElement>) => void;

    /**
     * __onChange__
     *
     * @param {Object} value – form data object
     * @param {boolean} isValid - is form valid
     */
    onChange?: (props: { name?: string; value?: any }) => void;

    /**
     * Debug mode
     * renders serialized form state at end of form
     */
    debug?: boolean;

    className?: string;
    style?: React.CSSProperties;

    // Errors object. Passed error message for FormControl if able
    // generally server-side errors
    errors?: FormErrors;

    handleDots?: boolean;

    /**
     * Define Button.type.name
     * @default - button
     */
    buttonTypeName?: string;

    /**
     * just in case you need the default behaviour
     * defaults to true
     */
    preventDefaultSubmit?: boolean;

    /**
     * pass an object here and its keys will be passed to all input elements
     * useful for things like server-side errors
     */
    context?: { [key: string]: any };
}

export type FormProps = IForm & Omit<BoxProps, 'onSubmit'>;

export interface FormErrors {
    // formFieldName: [errorValue, [errorStrings]]
    [name: string]: Array<string>;
}

export interface FormState {
    value: FormValue;
}
