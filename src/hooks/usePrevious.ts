import { MutableRefObject, useEffect, useRef } from 'react';

function usePrevious<T>(value: T): T {
    const ref: MutableRefObject<T> = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

export default usePrevious;
