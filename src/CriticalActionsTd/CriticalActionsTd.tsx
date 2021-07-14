import DotsVerticalIcon from 'mdi-react/DotsVerticalIcon';
import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '..';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { Clickable } from '../Clickable';
import { Flex } from '../Flex';
import { Menu, MenuButton, MenuItem, MenuList } from '../Menu';
import { Portal } from '../Portal';
import useTableStyle from '../Table/styles';
import { CriticalActionsTdProps } from './types';

// optionally convert table cell with multiple actions to a menu on mobile, and sticky for visibility at all times
export const CriticalActionsTd = ({ actions, mobileMenu = true, mobileMenuIcon, ...props }: CriticalActionsTdProps) => {
    const { cell: cellStyleProps, criticalActions: criticalActionsStyleProps } = useTableStyle({
        span: props.span,
    });

    const willRenderMenu = mobileMenu && actions?.length > 1;

    return (
        <Box as="td" {...cellStyleProps} {...criticalActionsStyleProps} {...props}>
            <ButtonGroup
                d={willRenderMenu ? ['none', null, null, 'inline-flex'] : 'inline-flex'}
                justifyContent="flex-end"
                w="100%"
            >
                {actions?.map((action) => (
                    <Button key={action?.label} title={action?.label} ariaLabel={action?.label} {...action}>
                        {action?.label}
                    </Button>
                ))}
            </ButtonGroup>

            {willRenderMenu && (
                <Flex w="100%" justify="flex-end">
                    <Menu placement="auto-end">
                        <MenuButton
                            as={Button}
                            color="buttonText"
                            // @ts-ignore
                            iconOnly
                            d={['inline-flex', null, null, 'none']}
                        >
                            {mobileMenuIcon || <DotsVerticalIcon />}
                        </MenuButton>
                        <Portal>
                            <MenuList minWidth="200px" d={['block', null, null, 'none']} color="bodyText">
                                {actions?.map(({ label, onClick, href }) => (
                                    <MenuItem
                                        key={label}
                                        as={href ? Link : Clickable}
                                        title={label}
                                        onClick={(e) => {
                                            if (onClick) {
                                                onClick(e);
                                            }
                                        }}
                                        href={href}
                                    >
                                        {label}
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </Portal>
                    </Menu>
                </Flex>
            )}
        </Box>
    );
};
