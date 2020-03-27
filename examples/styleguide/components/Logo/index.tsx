import React from 'react';
import { Icon, Text } from '../../../../src';

export function Logo() {
    return (
        <Text display="inline-flex" alignItems="center">
            <Icon size="5" color="primary.500" mr={2} name="check-circle" />
            <Text as="span" fontSize="xl" fontWeight="bold">
                Stuff
            </Text>
        </Text>
    );
}
