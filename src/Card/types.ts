import { BoxProps } from 'Box/types';

interface ICard {
    raised?: boolean;
}
export type CardProps = ICard & BoxProps;
