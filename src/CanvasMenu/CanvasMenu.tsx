import React from 'react';
import { Accordion, AccordionHeader, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Navigation } from '..';
import { Tooltip } from '../Tooltip';
import { CanvasMenuProps, NavItemProps } from './types';

export function CanvasMenu(props: CanvasMenuProps) {
    const { isMinified, isVisible, items = {}, as = 'aside', children } = props;

    const renderNavItem = ({
        label,
        href,
        icon = null,
        media = null,
        meta = null,
        isAccordion = false,
        unstyled,
        ...rest
    }: NavItemProps) => {
        if (isMinified && rest.isSubmenuItem) {
            return null;
        }
        const showFullItem = !isMinified && isVisible;

        return (
            <Navigation.Item href={href} exact={!isAccordion} {...rest}>
                <Tooltip label={label} placement="right" closeOnClick showTooltip={isMinified}>
                    <Navigation.ItemMedia icon={icon} mr={!isMinified && 4} unstyled={unstyled}>
                        {media}
                    </Navigation.ItemMedia>
                </Tooltip>
                {showFullItem && <Navigation.ItemText>{label}</Navigation.ItemText>}
                {meta && showFullItem && <Navigation.ItemMeta>{meta}</Navigation.ItemMeta>}
            </Navigation.Item>
        );
    };

    const renderAccordion = accProps => {
        return (
            <Navigation.Item>
                <Accordion allowToggle>
                    <AccordionItem>
                        <AccordionHeader py={0} borderBottomWidth={0}>
                            {renderNavItem({
                                ...accProps,
                                mb: 0,
                                isParent: true,
                                isMinified,
                            })}
                            {!isMinified && <AccordionIcon />}
                        </AccordionHeader>
                        {accProps.children &&
                            accProps.children.map(child => (
                                <AccordionPanel p={0}>
                                    {renderNavItem({
                                        ...child,
                                        isSubmenuItem: true,
                                    })}
                                </AccordionPanel>
                            ))}
                    </AccordionItem>
                </Accordion>
            </Navigation.Item>
        );
    };

    return (
        <Flex as={as} h="100%" direction="column">
            {/* CanvasMenu Header */}
            {items?.header?.length > 0 && (
                <Box>
                    {items.header.map(item =>
                        renderNavItem({
                            ...item,
                            align: 'start',
                            unstyled: true,
                        })
                    )}
                </Box>
            )}

            {/* CanvasMenu main content. If navigation, pass items.content array
            If non-navigational (such as a filter canvas), pass as CanvasMenu children */}
            <Box flexGrow="1">
                {/* Main navigation links (if any) */}
                {items?.content?.length > 0 &&
                    items.content.map(item => {
                        if (item.isAccordion) {
                            return renderAccordion(item);
                        }

                        return renderNavItem(item);
                    })}

                {children}
            </Box>

            {/* CanvasMenu Footer */}
            {items?.footer?.length > 0 && (
                <Box>
                    {items.footer.map(item => {
                        if (item.isAccordion) {
                            return renderAccordion(item);
                        }

                        return renderNavItem(item);
                    })}
                </Box>
            )}
        </Flex>
    );
}
