import { HeadingProps } from '../Heading/types';

export interface ICountdownTimer {
    kind?: HeadingProps['kind'];

    start_at: Date | string;
}

export type CountdownTimerProps = ICountdownTimer & HeadingProps;
