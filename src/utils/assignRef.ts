export function assignRef(ref: any, value: any) {
    if (ref == null) return;
    if (typeof ref === 'function') {
        ref(value);
    } else {
        try {
            /* eslint-disable */
            ref.current = value;
        } catch (error) {
            throw new Error(`Cannot assign value "${value}" to ref "${ref}"`);
        }
    }
}
