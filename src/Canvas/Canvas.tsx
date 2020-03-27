import React from 'react';
import Flex from '../Flex';
import useCanvasStyle from './styles';

export function CanvasContainer(props) {
    const style = useCanvasStyle(props);

    return <Flex {...style} {...props} />;
}

export function CanvasPanel(props) {
    return <Flex {...props} />;
}
