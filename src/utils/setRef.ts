export function setRef(ref: any, value: any) {
    if (typeof ref === 'function') {
        ref(value);
    } else if (ref) {
        /* eslint-disable */
        ref.current = value;
    }
}
