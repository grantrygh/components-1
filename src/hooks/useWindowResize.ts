import { throttle } from '@audentio/utils/lib/throttle';
import { useCallback, useEffect, useState } from 'react';

export function useWindowResize(throttleDuration: number = 200) {
    const [state, setState] = useState({
        windowHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
        windowWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
    });

    const resizeHandler = useCallback(
        throttle(() => {
            setState({
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight,
            });
        }, throttleDuration),
        []
    );

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);

        return function cleanup() {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    return state;
}
