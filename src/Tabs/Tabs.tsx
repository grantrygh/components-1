/* eslint-disable max-lines */

import { useId } from '@reach/auto-id';
import React, {
    Children,
    cloneElement,
    createContext,
    forwardRef,
    isValidElement,
    RefObject,
    useContext,
    useEffect,
    useRef,
    useState
} from 'react';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { useVariantColorWarning } from '../hooks/useVariantColorWarning';
import { Link } from '../Link';
import { PseudoBox } from '../PseudoBox';
import { assignRef } from '../utils/assignRef';
import { useRouter } from '../utils/router';
import useTabStyle, { useTabListStyle } from './styles';
import { TabContextProps, TabListProps, TabPanelProps, TabProps, TabsProps } from './types';

export const TabContext = createContext<TabContextProps>({});

const Tab = forwardRef((props: TabProps, ref) => {
    const { href, exact = true, onClick, pathname, isSelected, isDisabled, id, activeProps, ...rest } = props;

    useEffect(() => {
        if (href) {
            if (((exact && href === pathname) || (!exact && pathname.indexOf(href) > -1)) && !isSelected) {
                onClick(null);
            }
        }
    }, [pathname]);

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
            as={href ? Link : 'button'}
            href={href}
            type="button"
            disabled={isDisabled}
            aria-selected={isSelected}
            aria-disabled={isDisabled}
            aria-controls={`panel:${id}`}
            onClick={onClick}
            {...tabStyleProps}
            {...rest}
            {...(isSelected ? activeProps : {})}
        />
    );
});

const TabList = forwardRef((props: TabListProps, ref) => {
    const { children, onKeyDown, onClick, containerStyle = {}, ...rest } = props;

    const {
        id,
        index: selectedIndex,
        manualIndex,
        onManualTabChange,
        isManual,
        onChangeTab,
        onFocusPanel,
        orientation,
        showScrollbar,
        variant,
        align,
    } = useContext(TabContext);

    const { pathname } = useRouter();

    const { root: tabListStyleProps, container: tabListContainerStyleProps } = useTabListStyle({
        orientation,
        variant,
        align,
        showScrollbar,
    });

    const tabListRef: RefObject<HTMLDivElement> = useRef();
    const tabContainerRef: RefObject<HTMLDivElement> = useRef();
    const allNodes = useRef([]);

    const focusableIndexes = Children.map(children, (child, index) => {
        if (isValidElement(child)) {
            return child.props.isDisabled === true ? null : index;
        }
        return null;
    }).filter(index => index != null);

    const enabledSelectedIndex = focusableIndexes.indexOf(selectedIndex);
    const count = focusableIndexes.length;

    const enableSmartScrolling = index => {
        // smart tab scrolling to center active tab
        const currentTab = allNodes.current[index].getBoundingClientRect();
        const tabListProps = tabListRef?.current?.getBoundingClientRect();
        const containerProps = tabContainerRef?.current;

        if (containerProps && tabListProps && currentTab) {
            const tabCenter = currentTab && (currentTab.left + currentTab.right) / 2;
            const screenCenter =
                (containerProps && Number((containerProps.clientWidth + tabListRef?.current?.scrollLeft) / 2)) || 0;
            const scrolledLeft = containerProps?.scrollLeft || 0;

            // If the selected tab is at the beginning of the list, scroll all the way left
            if (tabCenter + scrolledLeft < screenCenter) {
                containerProps.scrollTo({
                    left: 0,
                    behavior: 'smooth',
                });
            }

            // If the selected tab is at the end of the list, scroll all the way right
            if (tabCenter + scrolledLeft > tabListProps.width - screenCenter) {
                containerProps.scrollTo({
                    left: tabListProps.width - screenCenter,
                    behavior: 'smooth',
                });
            }

            // if the selected tab is to the right of center, scroll right
            if (tabListRef && tabListRef.current) {
                containerProps.scrollTo({
                    left: scrolledLeft + (tabCenter - screenCenter),
                    behavior: 'smooth',
                });
            }
        }
    };

    const updateIndex = index => {
        const childIndex = focusableIndexes[index];
        allNodes.current[childIndex].focus();

        enableSmartScrolling(index);

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

            enableSmartScrolling(index);

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
                pathname,
            });
        }

        return null;
    });

    return (
        <PseudoBox ref={tabContainerRef} {...tabListContainerStyleProps} {...containerStyle}>
            <Flex
                onKeyDown={handleKeyDown}
                ref={tabListRef}
                role="tablist"
                aria-orientation={orientation}
                {...tabListStyleProps}
                {...rest}
            >
                {clones}
            </Flex>
        </PseudoBox>
    );
});

const TabPanel = forwardRef(
    ({ children, isSelected, selectedPanelRef, id, ...rest }: TabPanelProps, ref: RefObject<HTMLDivElement>) => {
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
    }
);

const TabPanels = forwardRef(({ children, ...rest }: TabPanelProps, ref: RefObject<HTMLDivElement>) => {
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
        <Box tabIndex={-1} ref={ref} {...rest}>
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
            showScrollbar,
            isFitted,
            ...props
        }: TabsProps,
        ref: RefObject<HTMLDivElement>
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
            showScrollbar,
            align,
            variant,
            isFitted,
            orientation,
        };

        return (
            // @ts-ignore
            <TabContext.Provider value={context}>
                <Box ref={ref} w="100%" {...props}>
                    {children}
                </Box>
            </TabContext.Provider>
        );
    }
);

export { Tabs, TabList, Tab, TabPanel, TabPanels };
