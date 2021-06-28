import { MdiReactIconComponentType } from 'mdi-react';
import { BoxProps } from '../Box/types';

type IFormErrorMessage = {
    Icon?: MdiReactIconComponentType;
};

export type FormErrorMessageProps = BoxProps & IFormErrorMessage;
