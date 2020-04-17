import { useMemo } from 'react';
import { setRef } from '../utils/setRef';

export function useForkRef(refA: any, refB: any) {
    return useMemo(() => {
        if (refA == null && refB == null) {
            return null;
        }
        return refValue => {
            setRef(refA, refValue);
            setRef(refB, refValue);
        };
    }, [refA, refB]);
}
