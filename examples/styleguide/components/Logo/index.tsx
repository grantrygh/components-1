import React from 'react';
import { Icon, Text } from '../../../../src';

// This will be replaced by actual brand svgs
function Logo() {
    return (
        <Text display="inline-flex" alignItems="center">
            <Icon size="5" color="primary.500" mr={2} name="check-circle" />
            <Text as="span" fontSize="xl" fontWeight="bold">
                Stuff
            </Text>
        </Text>
    );
}

const LogoIcon = () => <Icon size={28} color="primary.500" name="check-circle" />;

const LogoText = () => (
    <Text as="span" fontSize="xl" fontWeight="bold">
        Stuff
    </Text>
);

export { Logo, LogoIcon, LogoText };
