import differenceInSeconds from 'date-fns/differenceInSeconds';
import React, { useEffect, useState } from 'react';
import { Heading } from '../Heading';
import { CountdownTimerProps } from './types';

function useInitialDiff(to: Date | string) {
    const currentTime = new Date();
    const countdownTime = to instanceof Date ? to : new Date(to);

    const secondsToStart = differenceInSeconds(countdownTime, currentTime);

    const days = Math.floor(secondsToStart / (3600 * 24));
    const hours = Math.floor((secondsToStart - days * 3600 * 24) / 3600);
    const minutes = Math.floor((secondsToStart - days * 3600 * 24 - hours * 3600) / 60);
    const seconds = secondsToStart - days * 3600 * 24 - hours * 3600 - minutes * 60;

    // const days = differenceInDays(countdownTime, currentTime) - weeks * 7;
    // const hours = differenceInHours(countdownTime, currentTime) - days * 24;
    // const minutes = differenceInMinutes(countdownTime, currentTime) - hours * 60;
    // const seconds = differenceInSeconds(countdownTime, currentTime) - minutes * 60;

    return {
        days,
        hours,
        minutes,
        seconds,
    };
}

export function toDoubleDigits(passedNum) {
    const num = Math.abs(passedNum);
    if (num > 9) {
        return num;
    }
    if (num >= 0) {
        return `0${num}`;
    }

    return num;
}

export const CountdownTimer = ({ kind = 'h1', start_at, ...props }: CountdownTimerProps) => {
    const [{ days, hours, minutes, seconds }, setCounter] = useState(useInitialDiff(start_at));

    const hasStarted = new Date() > new Date(start_at);

    // live timer
    useEffect(() => {
        if (days === 0) {
            setInterval(() => {
                const currentTime = new Date();
                const countdownTime = new Date(start_at);

                const secondsToStart = differenceInSeconds(countdownTime, currentTime);

                const $hours = Math.floor(secondsToStart / 3600);
                const $minutes = Math.floor((secondsToStart - $hours * 3600) / 60);
                const $seconds = secondsToStart - $hours * 3600 - $minutes * 60;

                setCounter((prev) => ({
                    ...prev,
                    seconds: $seconds,
                    minutes: $minutes,
                    hours: $hours,
                }));
            }, 1000);
        }
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
                    {toDoubleDigits(hours)}:{toDoubleDigits(minutes)}:{toDoubleDigits(seconds)}
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
