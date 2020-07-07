import { useId } from '@reach/auto-id';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import { Children, cloneElement, createContext, forwardRef, isValidElement, useContext, useRef, useState } from 'react';
import { Box } from '../Box';
import { Collapse } from '../Collapse';
import { CollapseProps } from '../Collapse/types';
import { IconProps } from '../Icon/types';
import { PseudoBox } from '../PseudoBox';
import useAccordionStyle from './styles';
import { AccordionContextProps, AccordionHeaderProps, AccordionItemProps, AccordionProps } from './types';

/**
 * The accordion component delivers large amounts of content in a small space through progressive disclosure.
 *
 * By default, only one item may be expanded and it can only be collapsed again by expanding another.
 */
/**
 * Accordions allow users to expand and collapse sections of content.
 * It composes `Box` component.
 */
const Accordion = ({
    allowMultiple,
    allowToggle,
    index,
    defaultIndex,
    onChange,
    children,
    ...rest
}: AccordionProps) => {
    const initializeState = () => {
        if (allowMultiple) {
            return defaultIndex || [];
        }

        return defaultIndex || 0;
    };

    const getExpandCondition = (i, itemIndex) => {
        if (Array.isArray(i)) {
            return i.includes(itemIndex);
        }
        return i === itemIndex;
    };

    const [expandedIndex, setExpandedIndex] = useState(initializeState);
    const { current: isControlled } = useRef(index != null);

    const { root: accordionStyleProps } = useAccordionStyle({});

    const _index = isControlled ? index : expandedIndex;

    const clones = Children.map(children, (child, childIndex) => {
        if (!isValidElement(child)) {
            return null;
        }

        return cloneElement(child, {
            isOpen: getExpandCondition(_index, childIndex),
            onChange: isExpanded => {
                if (allowMultiple) {
                    if (isExpanded) {
                        const newIndexes = [...(_index as number[]), childIndex];
                        if (!isControlled) {
                            setExpandedIndex(newIndexes);
                        }
                        if (onChange) {
                            onChange(newIndexes);
                        }
                    } else {
                        const newIndexes = (_index as number[]).filter(itemIndex => itemIndex !== childIndex);
                        if (!isControlled) {
                            setExpandedIndex(newIndexes);
                        }
                        if (onChange) {
                            onChange(newIndexes);
                        }
                    }
                } else if (isExpanded) {
                    if (!isControlled) {
                        setExpandedIndex(childIndex);
                    }
                    if (onChange) {
                        onChange(childIndex);
                    }
                } else if (allowToggle) {
                    if (!isControlled) {
                        setExpandedIndex(null);
                    }
                    if (onChange) {
                        onChange(null);
                    }
                }
            },
        });
    });

    return (
        <Box data-accordion="" {...accordionStyleProps} {...rest}>
            {clones}
        </Box>
    );
};

const AccordionItemContext = createContext<AccordionContextProps>({});
const useAccordionItemContext = () => useContext(AccordionItemContext);

/**
 * The content of the accordion.
 * The children must be the `AccordionHeader` and `AccordionPanel` components.
 */
const AccordionItem = forwardRef(
    ({ isOpen, defaultIsOpen, id, isDisabled, onChange, children, ...rest }: AccordionItemProps, ref) => {
        const [isExpanded, setIsExpanded] = useState(defaultIsOpen || false);
        const { current: isControlled } = useRef(isOpen != null);
        const _isExpanded = isControlled ? isOpen : isExpanded;

        const { item: accordionItemStyleProps } = useAccordionStyle({});

        const onToggle = () => {
            if (onChange) {
                onChange(!_isExpanded);
            }
            if (!isControlled) {
                setIsExpanded(!isExpanded);
            }
        };

        const uuid = useId();
        const uniqueId = id || uuid;

        const headerId = `accordion-header-${uniqueId}`;
        const panelId = `accordion-panel-${uniqueId}`;

        return (
            <AccordionItemContext.Provider
                value={{
                    isExpanded: _isExpanded,
                    isDisabled,
                    headerId,
                    panelId,
                    onToggle,
                }}
            >
                <PseudoBox data-accordion-item="" ref={ref} {...accordionItemStyleProps} {...rest}>
                    {typeof children === 'function' ? children({ isExpanded: _isExpanded, isDisabled }) : children}
                </PseudoBox>
            </AccordionItemContext.Provider>
        );
    }
);

/**
 * AccordionHeader component composes `PseudoBox`, this means you can use
 * the `_expanded`, `_disabled`, `_hover`, etc. props to style them
 */
const AccordionHeader = forwardRef(({ onClick, ...props }: AccordionHeaderProps, ref) => {
    const { isExpanded, panelId, headerId, isDisabled, onToggle } = useAccordionItemContext();
    const { header: accordionHeaderStyleProps } = useAccordionStyle({});
    return (
        <PseudoBox
            ref={ref}
            as="button"
            type="button"
            disabled={isDisabled}
            aria-disabled={isDisabled}
            aria-expanded={isExpanded}
            onClick={event => {
                onToggle();
                if (onClick) {
                    onClick(event);
                }
            }}
            id={headerId}
            aria-controls={panelId}
            {...accordionHeaderStyleProps}
            {...props}
        />
    );
});

/**
 * AccordionPanel component composes `Collapse` to provide the height animation
 */
const AccordionPanel = forwardRef((props: CollapseProps, ref) => {
    const { isExpanded, panelId, headerId } = useAccordionItemContext();
    const { panel: accordionPanelStyleProps } = useAccordionStyle({});
    return (
        <Collapse
            ref={ref}
            data-accordion-panel=""
            role="region"
            id={panelId}
            aria-labelledby={headerId}
            aria-hidden={!isExpanded}
            isOpen={isExpanded}
            {...accordionPanelStyleProps}
            {...props}
        />
    );
});

const AccordionIcon = (props: IconProps) => {
    const { isExpanded, isDisabled } = useAccordionItemContext();
    const { icon: accordionIconStyleProps } = useAccordionStyle({
        isDisabled,
        isExpanded,
    });
    return (
        <Box {...accordionIconStyleProps} {...props}>
            <ChevronDownIcon />
        </Box>
    );
};

export { Accordion, AccordionItem, AccordionIcon, AccordionHeader, AccordionPanel };
