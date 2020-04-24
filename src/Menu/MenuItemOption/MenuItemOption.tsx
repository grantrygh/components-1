/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import { Children, cloneElement, forwardRef, isValidElement, useRef, useState } from 'react';
import { Box } from '../../Box';
import { Icon } from '../../Icon';
import { PseudoBox } from '../../PseudoBox';
import { MenuGroup, useMenuContext } from '../Menu';
import { useMenuItemStyle } from '../styles';
import { MenuItemOptionProps, MenuOptionGroupProps } from './types';

export const MenuItemOption = forwardRef(
    (
        {
            isDisabled,
            children,
            onClick,
            type,
            onMouseLeave,
            onMouseEnter,
            onKeyDown,
            isChecked,
            ...rest
        }: MenuItemOptionProps,
        ref
    ) => {
        // @ts-ignore
        const { focusableItems, focusAtIndex, closeMenu, closeOnSelect } = useMenuContext();

        const role = `menuitem${type}`;

        const handleSelect = e => {
            if (onClick) {
                onClick(e);
            }
            if (closeOnSelect) {
                closeMenu();
            }
        };

        const handleClick = event => {
            if (isDisabled) {
                event.stopPropagation();
                event.preventDefault();
                return;
            }
            handleSelect(event);
        };

        const handleKeyDown = event => {
            if (isDisabled) return;
            if (['Enter', ' '].includes(event.key)) {
                event.preventDefault();
                handleSelect(event);
            }

            if (onKeyDown) {
                onKeyDown(event);
            }
        };

        const handleMouseEnter = event => {
            if (isDisabled) {
                event.stopPropagation();
                event.preventDefault();
                return;
            }
            const nextIndex = focusableItems.current.indexOf(event.currentTarget);
            focusAtIndex(nextIndex);

            if (onMouseEnter) {
                onMouseEnter(event);
            }
        };

        const handleMouseLeave = event => {
            focusAtIndex(-1);
            if (onMouseLeave) {
                onMouseLeave(event);
            }
        };

        const styleProps = useMenuItemStyle(null);

        return (
            <PseudoBox
                ref={ref}
                as="button"
                onClick={handleClick}
                role={role}
                tabIndex={-1}
                aria-checked={isChecked}
                disabled={isDisabled}
                aria-disabled={isDisabled ? '' : undefined}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onKeyDown={handleKeyDown}
                {...styleProps}
                {...rest}
            >
                <Icon
                    name="check"
                    opacity={isChecked ? 1 : 0}
                    color="currentColor"
                    size="1em"
                    ml="spacing"
                    mr="-4px"
                    aria-hidden
                    data-menuitem-icon=""
                />
                <Box textAlign="left" as="span" mx="1rem" flex="1">
                    {children}
                </Box>
            </PseudoBox>
        );
    }
);

//

export const MenuOptionGroup = ({
    children,
    type = 'radio',
    name,
    title,
    value: valueProp,
    defaultValue,
    onChange,
    ...rest
}: MenuOptionGroupProps) => {
    const [value, setValue] = useState(defaultValue || '');
    const { current: isControlled } = useRef(valueProp != null);

    const derivedValue = isControlled ? valueProp : value;

    console.log('OPTION DERIVED VALUE');

    const handleChange = _value => {
        if (type === 'radio') {
            if (!isControlled) {
                setValue(_value);
            }
            if (onChange) {
                onChange(_value);
            }
        }

        if (type === 'checkbox') {
            const newValue = derivedValue.includes(_value)
                ? derivedValue.filter(itemValue => itemValue !== _value)
                : [...derivedValue, _value];

            if (!isControlled) {
                setValue(newValue);
            }
            if (onChange) {
                onChange(newValue);
            }
        }
    };

    const fallbackName = `radio-${useId()}`;

    return (
        <MenuGroup title={title} {...rest}>
            {Children.map(children, child => {
                if (!isValidElement(child)) {
                    return null;
                }

                if (type === 'radio') {
                    return cloneElement(child, {
                        type,
                        key: child.props.value,
                        onClick: event => {
                            handleChange(child.props.value);
                            if (child.props.onClick) {
                                child.props.onClick(event);
                            }
                        },
                        name: name || fallbackName,
                        isChecked: child.props.value === derivedValue,
                    });
                }

                if (type === 'checkbox') {
                    return cloneElement(child, {
                        type,
                        key: child.props.value,
                        onClick: event => {
                            handleChange(child.props.value);
                            if (child.props.onClick) {
                                child.props.onClick(event);
                            }
                        },
                        isChecked: derivedValue.includes(child.props.value),
                    });
                }

                return null;
            })}
        </MenuGroup>
    );
};
