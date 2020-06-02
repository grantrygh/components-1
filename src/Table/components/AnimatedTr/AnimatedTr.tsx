import { motion } from 'framer-motion';
import React from 'react';
import { TableRowProps } from '../../types';
import { Tr } from '../Tr';

const spring = {
    type: 'spring',
    damping: 50,
    stiffness: 300,
};

export const AnimatedTr = (
    props: TableRowProps & { layoutTransition?: { type?: string; damping?: number; stiffness?: number } }
) => <Tr asComponent={motion.tr} key={props.id} layoutTransition={props.layoutTransition || spring} {...props} />;
