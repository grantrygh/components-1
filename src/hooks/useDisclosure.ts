/**
 * useDisclosure is a custom hook to help handle common `open`, `close`, or `toggle` scenarios
 * @returns An object of `isOpen, onOpen, onClose, onToggle`
 */

import { useCallback, useState } from 'react';

interface IDisclosure {
    /**
     *
     */
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
}

export function useDisclosure(defaultIsOpen?: boolean): IDisclosure {
    const [isOpen, setIsOpen] = useState(Boolean(defaultIsOpen));
    const onClose = useCallback(() => setIsOpen(false), []);
    const onOpen = useCallback(() => setIsOpen(true), []);
    const onToggle = useCallback(() => setIsOpen(prevIsOpen => !prevIsOpen), []);
    return { isOpen, onOpen, onClose, onToggle };
}
