import React from 'react';
import { Flex, Heading, Icon } from '../../../../src';

// This will be replaced by actual brand svgs
function Logo() {
    return (
        <Flex display={['inline-flex', 'inline-flex', 'none']} alignItems="center">
            <Icon size="5" color="primary.500" mr="spacing-sm" name="check-circle" />
            <Heading as="span" kind="h4">
                Stuff
            </Heading>
        </Flex>
    );
}

const LogoIcon = () => <Icon size="28" color="primary.500" name="check-circle" />;

const LogoText = () => (
    <Heading as="span" kind="h4">
        Stuff
    </Heading>
);

export { Logo, LogoIcon, LogoText };
