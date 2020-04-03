import { MutableRefObject, useEffect, useRef } from 'react';

export function usePrevious<T>(value: T): T {
    const ref: MutableRefObject<T> = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}
