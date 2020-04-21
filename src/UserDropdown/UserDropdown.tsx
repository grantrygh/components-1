import React from 'react';
import { Avatar } from '../Avatar';
import { Flex } from '../Flex';
import { Icon } from '../Icon';
import { Menu, MenuButton, MenuItem, MenuList } from '../Menu';
import { Text } from '../Text';
import useUserDropdownStyle from './styles';

export default function UserDropdown(props) {
    const style = useUserDropdownStyle(props);

    return (
        <Menu>
            <MenuButton as={Flex} tabIndex="0" fontWeight="semibold" direction="row" align="center" {...style}>
                <Avatar size="sm" mr={{ lg: 'spacing-sm' }} />

                <Flex {...style.main}>
                    <Flex direction="column">
                        <Text as="span" mb="-2px">
                            Austin Robertson
                        </Text>{' '}
                        <Text as="span" kind="small" state="faint">
                            Administrator
                        </Text>
                    </Flex>

                    <Flex>
                        <Icon {...style.main} color="faintText" name="chevron-down" ml="spacing" size="6" />
                    </Flex>
                </Flex>
            </MenuButton>

            <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Upload</MenuItem>
                <MenuItem>Delete</MenuItem>
            </MenuList>
        </Menu>
    );
}
