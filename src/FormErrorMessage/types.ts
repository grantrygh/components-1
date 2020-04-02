import { MdiReactIconComponentType } from 'mdi-react';
import { BoxProps } from '../Box/types';

interface IFormErrorMessage {
    Icon?: MdiReactIconComponentType;
}

export type FormErrorMessageProps = BoxProps & IFormErrorMessage;
