/** @jsx jsx */
import { jsx, ThemeContext } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import React, { useContext } from 'react';
import { Icon } from '.';
import { Flex } from '../Flex';
import { Text } from '../Text';
import { Icons as ThemeIcons } from '../theme/icons';

const stories = storiesOf('Icons', module);

const Icons = () => {
    const { icons: iconPaths } = useContext<{ icons?: any }>(ThemeContext);
    return (
        <React.Fragment>
            {Object.keys(iconPaths).map((icon: ThemeIcons) => (
                <Flex
                    border="normal"
                    borderColor="gray.100"
                    minWidth="100px"
                    p="input.spacing.sm"
                    mr="input.spacing.sm"
                    mb="input.spacing.sm"
                    display="inline-flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <Icon name={icon} size="24px" />
                    <Text mt="input.spacing.sm" fontSize="sm" textAlign="center">
                        {icon}
                    </Text>
                </Flex>
            ))}
        </React.Fragment>
    );
};

stories.add('Default', () => <Icons />);
