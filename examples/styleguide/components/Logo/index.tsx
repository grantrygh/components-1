import React from 'react';
import { Heading, Icon, Text } from '../../../../src';

// This will be replaced by actual brand svgs
function Logo() {
    return (
        <Text display="inline-flex" alignItems="center">
            <Icon size="5" color="primary.500" mr={2} name="check-circle" />
            <Heading as="span" kind="h4">
                Stuff
            </Heading>
        </Text>
    );
}

const LogoIcon = () => <Icon size="28" color="primary.500" name="check-circle" />;

const LogoText = () => (
    <Heading as="span" kind="h4">
        Stuff
    </Heading>
);

export { Logo, LogoIcon, LogoText };
