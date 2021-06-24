import differenceInDays from 'date-fns/differenceInDays';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import React, { useEffect, useState } from 'react';
import { Heading } from '../Heading';
import { CountdownTimerProps } from './types';

function getInitialDiff(to: Date | string) {
    const currentTime = new Date();
    const countdownTime = to instanceof Date ? to : new Date(to);

    const secondsToStart = differenceInSeconds(countdownTime, currentTime);

    const days = differenceInDays(countdownTime, currentTime);

    return {
        days,
        secondsToStart,
    };
}

export function toDoubleDigits(passedNum) {
    const numString = Math.abs(passedNum).toString();
    return numString.padStart(2, '0');
}

export const CountdownTimer = ({ kind = 'h1', start_at, ...props }: CountdownTimerProps) => {
    const [{ days, secondsToStart }, setCounter] = useState(getInitialDiff(start_at));

    const now = new Date();
    const hasStarted = now > new Date(start_at);

    // live timer
    useEffect(() => {
        let counter;

        if (days === 0) {
            counter = setInterval(() => {
                const currentTime = new Date();
                const countdownTime = start_at instanceof Date ? start_at : new Date(start_at);

                const $secondsToStart = differenceInSeconds(countdownTime, currentTime);

                setCounter((prev) => ({
                    ...prev,
                    secondsToStart: $secondsToStart,
                }));
            }, 1000);

            // cleanup
            return () => clearInterval(counter);
        }

        return () => null;
    }, []);

    return (
        <>
            {!hasStarted && days > 0 && (
                <Heading kind={kind} {...props}>
                    {days} day{days > 1 ? 's' : ''}
                </Heading>
            )}
            {!hasStarted && days === 0 && (
                <Heading kind={kind} {...props}>
                    {hasStarted ? '-' : ''}
                    {new Date(secondsToStart * 1000).toISOString().substr(11, 8)}
                </Heading>
            )}

            {hasStarted && (
                <Heading kind={kind} {...props}>
                    {toDoubleDigits(0)}:{toDoubleDigits(0)}:{toDoubleDigits(0)}
                </Heading>
            )}
        </>
    );
};
