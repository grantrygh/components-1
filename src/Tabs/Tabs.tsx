/* eslint-disable max-lines */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useId } from '@reach/auto-id';
import {
    Children,
    cloneElement,
    createContext,
    forwardRef,
    isValidElement,
    RefObject,
    useContext,
    useRef,
    useState,
} from 'react';
import Box from '../Box';
import Flex from '../Flex';
import { useVariantColorWarning } from '../hooks/useVariantColorWarning';
import PseudoBox from '../PseudoBox';
import { assignRef } from '../utils/assignRef';
import useTabStyle, { useTabListStyle } from './styles';
import { TabContextProps, TabListProps, TabPanelProps, TabProps, TabsProps } from './types';

export const TabContext = createContext<TabContextProps>({});

const Tab = forwardRef((props: TabProps, ref) => {
    const { isSelected, isDisabled, id, ...rest } = props;

    const { orientation, variant, isFitted, color, size } = useContext(TabContext);

    const tabStyleProps = useTabStyle({
        color,
        orientation,
        variant,
        size,
        isFitted,
    });

    return (
        <PseudoBox
            ref={ref}
            role="tab"
            tabIndex={isSelected ? 0 : -1}
            id={`tab:${id}`}
            outline="none"
            as="button"
            type="button"
            disabled={isDisabled}
            aria-selected={isSelected}
            aria-disabled={isDisabled}
            aria-controls={`panel:${id}`}
            {...tabStyleProps}
            {...rest}
        />
    );
});

const TabList = forwardRef((props: TabListProps, ref) => {
    const { children, onKeyDown, onClick, ...rest } = props;

    const {
        id,
        index: selectedIndex,
        manualIndex,
        onManualTabChange,
        isManual,
        onChangeTab,
        onFocusPanel,
        orientation,
        variant,
        align,
    } = useContext(TabContext);

    const tabListStyleProps = useTabListStyle({
        orientation,
        variant,
        align,
    });

    const allNodes = useRef([]);

    const focusableIndexes = Children.map(children, (child, index) => {
        if (isValidElement(child)) {
            return child.props.isDisabled === true ? null : index;
        }
        return null;
    }).filter(index => index != null);

    const enabledSelectedIndex = focusableIndexes.indexOf(selectedIndex);
    const count = focusableIndexes.length;

    const updateIndex = index => {
        const childIndex = focusableIndexes[index];
        allNodes.current[childIndex].focus();
        if (onChangeTab) {
            onChangeTab(childIndex);
        }
    };

    const handleKeyDown = event => {
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            const nextIndex = (enabledSelectedIndex + 1) % count;
            updateIndex(nextIndex);
        }

        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            event.preventDefault();
            const nextIndex = (enabledSelectedIndex - 1 + count) % count;
            updateIndex(nextIndex);
        }

        if (event.key === 'Home') {
            event.preventDefault();
            updateIndex(0);
        }

        if (event.key === 'End') {
            event.preventDefault();
            updateIndex(count - 1);
        }

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (onFocusPanel) {
                onFocusPanel();
            }
        }

        if (onKeyDown) {
            onKeyDown(event);
        }
    };

    const clones = Children.map(children, (child: React.ReactElement, index) => {
        const isSelected = isManual ? index === manualIndex : index === selectedIndex;

        const handleClick = event => {
            // Hack for Safari. Buttons don't receive focus on click on Safari
            // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus
            allNodes.current[index].focus();

            onManualTabChange(index);
            onChangeTab(index);

            if (child.props.onClick) {
                child.props.onClick(event);
            }
        };

        if (isValidElement(child)) {
            return cloneElement(child, {
                //  @ts-ignore
                ref: (node: any) => {
                    allNodes.current[index] = node;
                },
                isSelected,
                onClick: handleClick,
                id: `${id}-${index}`,
            });
        }

        return null;
    });

    return (
        <Flex
            onKeyDown={handleKeyDown}
            ref={ref}
            role="tablist"
            aria-orientation={orientation}
            {...tabListStyleProps}
            {...rest}
        >
            {clones}
        </Flex>
    );
});

const TabPanel = forwardRef(({ children, isSelected, selectedPanelRef, id, ...rest }: TabPanelProps, ref) => {
    return (
        <Box
            ref={node => {
                if (isSelected) {
                    assignRef(selectedPanelRef, node);
                }
                assignRef(ref, node);
            }}
            role="tabpanel"
            tabIndex={-1}
            aria-labelledby={`tab:${id}`}
            hidden={!isSelected}
            id={`panel:${id}`}
            outline={0}
            {...rest}
        >
            {children}
        </Box>
    );
});

const TabPanels = forwardRef(({ children, ...rest }: TabPanelProps, ref) => {
    const { index: selectedIndex, selectedPanelRef, id, isManual, manualIndex } = useContext(TabContext);

    const clones = Children.map(children, (child, index) => {
        if (!isValidElement(child)) {
            return null;
        }

        return cloneElement(child, {
            isSelected: isManual ? index === manualIndex : index === selectedIndex,
            selectedPanelRef,
            id: `${id}-${index}`,
        });
    });

    return (
        <Box tabIndex="-1" ref={ref} {...rest}>
            {clones}
        </Box>
    );
});

const Tabs = forwardRef(
    (
        {
            children,
            onChange,
            index: controlledIndex,
            defaultIndex,
            isManual,
            variant = 'line',
            variantColor,
            align,
            size = 'md',
            orientation = 'horizontal',
            isFitted,
            ...props
        }: TabsProps,
        ref
    ) => {
        // Wrong usage of `variantColor` prop is quite common
        // Let's add a warning hook that validates the passed variantColor
        useVariantColorWarning('Tabs', variantColor);

        const [manualIndex, setManualIndex] = useState(controlledIndex || defaultIndex || 0);

        const { current: isControlled } = useRef(controlledIndex != null);
        const selectedPanelRef: RefObject<HTMLElement> = useRef();

        const getInitialIndex = () => {
            if (!isManual) {
                return defaultIndex || 0;
            }
            return controlledIndex || defaultIndex || 0;
        };

        const [selectedIndex, setSelectedIndex] = useState(getInitialIndex);

        const getActualIdx = () => {
            if (isManual) {
                return selectedIndex;
            }
            return isControlled ? controlledIndex : selectedIndex;
        };

        const actualIdx = getActualIdx();
        const manualIdx = isControlled ? controlledIndex : manualIndex;

        const onChangeTab = index => {
            if (!isControlled) {
                setSelectedIndex(index);
            }

            if (isControlled && isManual) {
                setSelectedIndex(index);
            }

            if (!isManual && onChange) {
                onChange(index);
            }
        };

        const onManualTabChange = index => {
            if (!isControlled) {
                setManualIndex(index);
            }

            if (isManual && onChange) {
                onChange(index);
            }
        };

        const onFocusPanel = () => {
            if (selectedPanelRef.current) {
                selectedPanelRef.current.focus();
            }
        };

        const id = useId();

        const context = {
            id,
            index: actualIdx,
            manualIndex: manualIdx,
            onManualTabChange,
            isManual,
            onChangeTab,
            selectedPanelRef,
            onFocusPanel,
            color: variantColor,
            size,
            align,
            variant,
            isFitted,
            orientation,
        };

        return (
            <TabContext.Provider value={context}>
                <Box ref={ref} {...props}>
                    {children}
                </Box>
            </TabContext.Provider>
        );
    }
);

export { Tabs, TabList, Tab, TabPanel, TabPanels };
