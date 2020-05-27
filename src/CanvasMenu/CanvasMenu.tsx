import React from 'react';
import { Accordion, AccordionHeader, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Navigation } from '..';
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
        ...rest
    }: NavItemProps) => {
        if (isMinified && rest.isSubmenuItem) {
            return null;
        }
        const showFullItem = !isMinified && isVisible;

        return (
            <Navigation.Item href={href} exact={!isAccordion} {...rest}>
                <Navigation.ItemMedia icon={icon} mr={!isMinified && 4}>
                    {media}
                </Navigation.ItemMedia>
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
                        <AccordionHeader>
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
                                <AccordionPanel>
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
