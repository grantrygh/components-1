import React from 'react';
import { Accordion, AccordionHeader, AccordionIcon, AccordionItem, AccordionPanel } from '../Accordion';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { Navigation } from '../Navigation';
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
        exact = true,
        isAccordion = false,
        unstyled,
        ...rest
    }: NavItemProps) => {
        if (isMinified && rest.isSubmenuItem) {
            return null;
        }
        const showFullItem = !isMinified && isVisible;

        return (
            <Navigation.Item href={href} exact={isAccordion ? false : exact} key={label + href} {...rest}>
                {media && (
                    <Tooltip label={label} placement="right" closeOnClick showTooltip={isMinified}>
                        <Navigation.ItemMedia icon={icon} mr={!isMinified && 4} unstyled={unstyled}>
                            {media}
                        </Navigation.ItemMedia>
                    </Tooltip>
                )}
                {showFullItem && <Navigation.ItemText>{label}</Navigation.ItemText>}
                {meta && showFullItem && <Navigation.ItemMeta>{meta}</Navigation.ItemMeta>}
            </Navigation.Item>
        );
    };

    const renderAccordion = (accProps) => {
        return (
            <Navigation.Item key={accProps.children}>
                <Accordion allowToggle defaultIndex={-1}>
                    <AccordionItem defaultIsOpen={false}>
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
                            accProps.children.map((child) => (
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

    const renderItem = (item) => {
        // allows for passing and rendering components, rather than menu item objects
        if (!item || (!item?.label && !item?.media && !item?.icon)) {
            if (item && typeof item === 'function') {
                const itemCopy = item as Function;
                return itemCopy({ isMinified, isVisible });
            }
            return item;
        }

        if (item.isAccordion) {
            return renderAccordion(item);
        }

        return renderNavItem(item);
    };

    return (
        <Flex as={as} flex={1} direction="column">
            {/* CanvasMenu Header */}
            {items?.header?.length > 0 && (
                <Box>
                    {items.header.map((item) =>
                        renderItem(
                            typeof item === 'function'
                                ? item
                                : {
                                      ...item,
                                      align: 'center',
                                      unstyled: true,
                                      minH: null,
                                      pb: 'spacing',
                                  }
                        )
                    )}
                </Box>
            )}

            {/* CanvasMenu main content. If navigation, pass items.content array
            If non-navigational (such as a filter canvas), pass as CanvasMenu children */}
            <Box flexGrow="1">
                {/* Main navigation links (if any) */}
                {items?.content?.length > 0 &&
                    items.content.map((item) => {
                        return renderItem(item);
                    })}

                {children}
            </Box>

            {/* CanvasMenu Footer */}
            {items?.footer?.length > 0 && (
                <Box>
                    {items.footer.map((item) => {
                        return renderItem(item);
                    })}
                </Box>
            )}
        </Flex>
    );
}
