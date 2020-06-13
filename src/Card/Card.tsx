/** @jsx jsx */
import { jsx } from '@emotion/core';
import { PseudoBox } from '../PseudoBox';
import useCardStyle from './styles';
import { CardProps } from './types';

export const Card = ({ raised, ...rest }: CardProps) => {
    const cardStyleProps = useCardStyle({
        raised,
    });
    return <PseudoBox {...cardStyleProps} {...rest} />;
};
