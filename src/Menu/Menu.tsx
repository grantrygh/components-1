/* eslint-disable max-lines */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import { createContext, forwardRef, useContext, useEffect, useRef, useState } from 'react';
import { Box } from '../Box';
import Divider from '../Divider';
import { useForkRef } from '../hooks/useForkRef';
import { usePrevious } from '../hooks/usePrevious';
import Popper from '../Popper';
import { PseudoBox } from '../PseudoBox';
import Text from '../Text';
import { getFocusables } from '../utils/getFocusables';
import { wrapEvent } from '../utils/wrapEvent';
import { useMenuItemStyle, useMenuStyle } from './styles';
import { MenuButtonProps, MenuContextProps, MenuGroupProps, MenuItemProps, MenuListProps, MenuProps } from './types';

const MenuContext = createContext<MenuContextProps>({});

const Menu = ({
    children,
    isOpen: isOpenProp,
    defaultIsOpen,
    onOpen,
    onClose,
    autoSelect = true,
    closeOnBlur = true,
    closeOnSelect = true,
    defaultActiveIndex,
    placement,
}: MenuProps) => {
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex || -1);
    const [isOpen, setIsOpen] = useState(defaultIsOpen || false);
    const { current: isControlled } = useRef(isOpenProp != null);

    const _isOpen = isControlled ? isOpenProp : isOpen;

    const menuId = `menu-${useId()}`;
    const buttonId = `menubutton-${useId()}`;

    const focusableItems = useRef(null);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const initTabIndex = () => {
        focusableItems.current.forEach((node, index) => index === 0 && node.setAttribute('tabindex', 0));
    };

    useEffect(() => {
        if (_isOpen && menuRef && menuRef.current) {
            const focusables = getFocusables(menuRef.current).filter(node =>
                ['menuitem', 'menuitemradio', 'menuitemcheckbox'].includes(node.getAttribute('role'))
            );
            focusableItems.current = menuRef.current ? focusables : [];
            initTabIndex();
        }
    }, [_isOpen]);

    const updateTabIndex = index => {
        if (focusableItems.current.length > 0) {
            const nodeAtIndex = focusableItems.current[index];
            focusableItems.current.forEach(node => {
                if (node !== nodeAtIndex) {
                    node.setAttribute('tabindex', -1);
                }
            });
            nodeAtIndex.setAttribute('tabindex', 0);
        }
    };

    const resetTabIndex = () => {
        if (focusableItems.current) {
            focusableItems.current.forEach(node => node.setAttribute('tabindex', -1));
        }
    };

    const wasPreviouslyOpen = usePrevious(_isOpen);

    useEffect(() => {
        if (activeIndex !== -1) {
            if (focusableItems.current[activeIndex]) {
                focusableItems.current[activeIndex].focus();
            }
            updateTabIndex(activeIndex);
        }
        if (activeIndex === -1 && !_isOpen && wasPreviouslyOpen && buttonRef.current) {
            buttonRef.current.focus();
        }
        if (activeIndex === -1 && _isOpen && menuRef.current) {
            menuRef.current.focus();
        }
    }, [activeIndex, _isOpen, buttonRef, menuRef, wasPreviouslyOpen]);

    const openMenu = () => {
        if (!isControlled) {
            setIsOpen(true);
        }

        if (onOpen) {
            onOpen();
        }
    };

    const focusOnFirstItem = () => {
        openMenu();
        setActiveIndex(0);
    };

    const focusAtIndex = index => {
        setActiveIndex(index);
    };

    const focusOnLastItem = () => {
        openMenu();
        setActiveIndex(focusableItems.current.length - 1);
    };

    const closeMenu = () => {
        if (!isControlled) {
            setIsOpen(false);
        }

        if (onClose) {
            onClose();
        }

        setActiveIndex(-1);
        resetTabIndex();
    };

    const context = {
        activeIndex,
        isOpen: _isOpen,
        focusAtIndex,
        focusOnLastItem,
        focusOnFirstItem,
        closeMenu,
        buttonRef,
        menuRef,
        focusableItems,
        placement,
        menuId,
        buttonId,
        openMenu,
        autoSelect,
        closeOnSelect,
        closeOnBlur,
    };

    return (
        <MenuContext.Provider value={context}>
            {typeof children === 'function' ? children({ isOpen: _isOpen, onClose: closeMenu }) : children}
        </MenuContext.Provider>
    );
};

export function useMenuContext() {
    const context = useContext(MenuContext);
    if (context === undefined) {
        throw new Error('useMenuContext must be used within a MenuContext Provider');
    }
    return context;
}

//

const PseudoButton = forwardRef((props, ref) => <PseudoBox ref={ref} as="button" {...props} />);

//

const MenuButton = forwardRef(({ onClick, onKeyDown, as: Comp = PseudoButton, ...rest }: MenuButtonProps, ref) => {
    // @ts-ignore
    const {
        isOpen,
        focusOnLastItem,
        focusOnFirstItem,
        closeMenu,
        menuId,
        buttonId,
        autoSelect,
        openMenu,
        buttonRef,
    } = useMenuContext();

    const menuButtonRef = useForkRef(buttonRef, ref);

    return (
        <Comp
            aria-haspopup="menu"
            aria-expanded={isOpen}
            aria-controls={menuId}
            id={buttonId}
            role="button"
            ref={menuButtonRef}
            onClick={wrapEvent(onClick, () => {
                if (isOpen) {
                    closeMenu();
                } else if (autoSelect) {
                    focusOnFirstItem();
                } else {
                    openMenu();
                }
            })}
            onKeyDown={wrapEvent(onKeyDown, event => {
                if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    focusOnFirstItem();
                }

                if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    focusOnLastItem();
                }
            })}
            {...rest}
        />
    );
});

//

const MenuList = ({ onKeyDown, onBlur, ...props }: MenuListProps) => {
    const {
        activeIndex: index,
        isOpen,
        focusAtIndex,
        focusOnFirstItem,
        focusOnLastItem,
        closeMenu,
        focusableItems,
        buttonRef,
        menuId,
        buttonId,
        menuRef,
        closeOnBlur,
        placement,
    } = useMenuContext();

    const handleKeyDown = event => {
        const count = focusableItems.current.length;
        let nextIndex;
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            nextIndex = (index + 1) % count;
            focusAtIndex(nextIndex);
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            nextIndex = (index - 1 + count) % count;
            focusAtIndex(nextIndex);
        } else if (event.key === 'Home') {
            focusOnFirstItem();
        } else if (event.key === 'End') {
            focusOnLastItem();
        } else if (event.key === 'Tab') {
            event.preventDefault();
        } else if (event.key === 'Escape') {
            closeMenu();
        }

        // Set focus based on first character
        if (/^[a-z0-9_-]$/i.test(event.key)) {
            event.stopPropagation();
            event.preventDefault();
            const foundNode = focusableItems.current.find(item => item.textContent.toLowerCase().startsWith(event.key));
            if (foundNode) {
                nextIndex = focusableItems.current.indexOf(foundNode);
                focusAtIndex(nextIndex);
            }
        }

        if (onKeyDown) {
            onKeyDown(event);
        }
    };

    // Close the menu on blur
    const handleBlur = event => {
        if (
            closeOnBlur &&
            isOpen &&
            menuRef.current &&
            buttonRef.current &&
            !menuRef.current.contains(event.relatedTarget) &&
            !buttonRef.current.contains(event.relatedTarget)
        ) {
            closeMenu();
        }

        if (onBlur) {
            onBlur(event);
        }
    };

    const menuStyleProps = useMenuStyle(null);

    return (
        <Popper
            usePortal={false}
            isOpen={isOpen}
            anchorEl={buttonRef.current}
            placement={placement}
            modifiers={{
                preventOverflow: { enabled: true, boundariesElement: 'viewport' },
            }}
            role="menu"
            ref={menuRef}
            id={menuId}
            aria-labelledby={buttonId}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            {...menuStyleProps}
            {...props}
        />
    );
};

//

const MenuItem = forwardRef(
    (
        { isDisabled, onClick, onMouseLeave, onMouseEnter, onKeyDown, role = 'menuitem', ...props }: MenuItemProps,
        ref
    ) => {
        // @ts-ignore
        const { focusableItems, focusAtIndex, closeOnSelect, closeMenu } = useMenuContext();

        const menuItemStyleProps = useMenuItemStyle(null);

        return (
            <PseudoBox
                as="button"
                ref={ref}
                role={role}
                tabIndex={-1}
                disabled={isDisabled}
                aria-disabled={isDisabled}
                onClick={wrapEvent(onClick, event => {
                    if (isDisabled) {
                        event.stopPropagation();
                        event.preventDefault();
                        return;
                    }
                    if (closeOnSelect) {
                        closeMenu();
                    }
                })}
                onMouseEnter={wrapEvent(onMouseEnter, event => {
                    if (isDisabled) {
                        event.stopPropagation();
                        event.preventDefault();
                        return;
                    }
                    if (focusableItems && focusableItems.current.length > 0) {
                        const nextIndex = focusableItems.current.indexOf(event.currentTarget);
                        focusAtIndex(nextIndex);
                    }
                })}
                onMouseLeave={wrapEvent(onMouseLeave, () => {
                    focusAtIndex(-1);
                })}
                onKeyDown={wrapEvent(onKeyDown, event => {
                    if (isDisabled) return;
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();

                        if (onClick) {
                            onClick(event);
                        }

                        if (closeOnSelect) {
                            closeMenu();
                        }
                    }
                })}
                {...menuItemStyleProps}
                {...props}
            />
        );
    }
);

//

const MenuDivider = forwardRef((props, ref) => <Divider ref={ref} orientation="horizontal" {...props} />);

//

const MenuGroup = forwardRef(({ children, title, ...rest }: MenuGroupProps, ref) => (
    <Box ref={ref} role="group">
        {title && (
            <Text mx={4} my={2} fontWeight="semibold" fontSize="sm" {...rest}>
                {title}
            </Text>
        )}
        {children}
    </Box>
));

export { Menu, MenuButton, MenuDivider, MenuGroup, MenuList, MenuItem };
