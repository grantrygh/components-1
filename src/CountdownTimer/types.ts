import { HeadingProps } from '../Heading/types';

export interface ICountdownTimer {
    kind?: HeadingProps['kind'];

    start_at: Date;
}

export type CountdownTimerProps = ICountdownTimer & HeadingProps;
