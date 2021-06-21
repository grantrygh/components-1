import { Options } from 'check-password-strength';
import { BoxProps } from '../Box/types';

export interface IPasswordStrength {
    // name of the connected password input within the <Form />. Defaults to "password"
    fieldName?: string;

    // optional to override defaultOptions for password strength, such as id, value, minDiversity, minLength
    // https://www.npmjs.com/package/check-password-strength
    customOverrides?: Options<string>;
}

export type PasswordStrengthProps = IPasswordStrength & BoxProps;
