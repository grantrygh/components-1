/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Box } from '../Box';
import { CardProps } from './types';

export const Card = ({ raised, ...rest }: CardProps) => {
    return <Box shadow={raised ? 'raised' : 'card'} p="spacing" {...rest} />;
};
