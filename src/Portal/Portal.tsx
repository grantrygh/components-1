/**
 * Portal Component
 *
 * The following code is a derivative of the amazing work done by the Material UI team.
 * Original source: https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Portal/Portal.js
 */

import { Children, cloneElement, forwardRef, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useEnhancedEffect } from '../hooks/useEnhancedEffect';
import { useForkRef } from '../hooks/useForkRef';
import { setRef } from '../utils/setRef';
import { PortalProps } from './types';

function getContainer(container) {
    const newContainer = typeof container === 'function' ? container() : container;
    return newContainer;
}

export const Portal = forwardRef(({ children, container, isDisabled = false, onRendered }: PortalProps, ref) => {
    const [mountNode, setMountNode] = useState(null);
    const childRef = useRef(children);
    const handleRef = useForkRef(childRef, ref);

    useEnhancedEffect(() => {
        if (!isDisabled) {
            setMountNode(getContainer(container) || document.body);
        }
    }, [container, isDisabled]);

    useEnhancedEffect(() => {
        if (mountNode && !isDisabled) {
            setRef(ref, mountNode);
            return () => {
                setRef(ref, null);
            };
        }

        return undefined;
    }, [ref, mountNode, isDisabled]);

    useEnhancedEffect(() => {
        if (onRendered && (mountNode || isDisabled)) {
            onRendered();
        }
    }, [onRendered, mountNode, isDisabled]);

    if (isDisabled) {
        Children.only(children);
        return cloneElement(children, {
            ref: handleRef,
        });
    }

    return mountNode ? createPortal(children, mountNode) : mountNode;
});
