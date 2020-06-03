import { motion } from 'framer-motion';
import React, { createContext, createRef, useContext, useEffect, useState } from 'react';
import { Box, useTheme } from '..';
import { Flex } from '../Flex';
import { useWindowResize } from '../hooks/useWindowResize';
import { ModalOverlay } from '../Modal';
import useCanvasStyle from './styles';

export const CanvasContext = createContext<any>(null);

const MotionPanel = motion.custom(Box);

const getPanels = panels => {
    const panelList = Object.keys(panels).map(panelKey => panels[panelKey]);
    const leftPanels = panelList.filter(panel => panel.position === 'left');
    const rightPanels = panelList.filter(panel => panel.position === 'right');
    const mainPanel = panelList.filter(panel => panel.name === 'main');

    return {
        leftPanels,
        rightPanels,
        mainPanel,
    };
};

const isWithinRange = (width, range) => {
    if (width && range?.length === 2 && width >= range[0] && width < range[1]) {
        return true;
    }
    return false;
};

export function CanvasContainer(props) {
    const [panels, setPanels] = useState<any>(props.initialCanvasState);
    const { zIndices } = useTheme();

    const styles = useCanvasStyle({
        ...props,
    });

    const updatePanel = (name, update) => {
        setPanels($prev => {
            return {
                ...$prev,
                [name]: {
                    ...($prev[name] || {}),
                    ...update,
                },
            };
        });
    };

    const setPanel = (name, update) => {
        setPanels($prev => {
            return {
                ...$prev,
                [name]: update($prev[name] || {}),
            };
        });
    };

    const togglePanel = name => {
        setPanels($prev => {
            const panel = $prev[name];
            if (!panel) {
                return null;
            }

            return {
                ...$prev,
                [name]: {
                    ...panel,
                    // if desktop and panel can be minified, minify rather than hiding
                    // if mobile, skip minifiable and either show or hide
                    isVisible: !panel.isMinifiable ? !panel?.isVisible : panel?.isVisible,
                    isMinified: panel.isMinifiable ? !panel?.isMinified : false,
                },
            };
        });
    };

    const renderPanel = (panel, i) => {
        if (!panel || !(panel && panel.render)) return null;

        const { name, ref, children, isVisible, type, bg, isOverlay, p = 'canvas.spacing', ...panelProps } = panel;

        const animateTo = (isVisible && (panelProps.isMinified ? 'minified' : 'visible')) || 'hidden';
        const zIndex = Object.keys(panels).length - i;

        const panelStyleProps = {
            ...styles.panel,
            ...styles.getPanelStyle({
                width: panelProps.width,
                position: panelProps.position,
                bg,
                isOverlay,
                name,
                zIndex,
            }),
        };

        /** TODO: We're going to want to rework canvas visibility and zIndex layering a bit based on whether the canvas was opened by default, or manually
         * If opened manually, the canvas should be opened as an overlay when scaling down width to within the isOverlay range
         * If canvas was opened by default, likely do not show the overlay as opened upon scaling
         * This avoids having possible multiple canvas open ( and needing to be closed ) on mobile
         * Also limit to 1 canvas open.
         * There also needs to be some tracker on currently open canvases. For example, if notifications canvas is open and viewport scales down, then
         * the notifications overlay should be open on mobile, and not the filter ovleray that was previously expanded inline.
         * */

        return (
            <Flex zIndex={(isVisible && isOverlay ? zIndices.panel : 1) + zIndex} flexGrow={name === 'main' && 1}>
                <MotionPanel key={panel.name} initial={animateTo} animate={animateTo} {...panelStyleProps}>
                    <Flex ref={ref} direction="column" height="100%" p={name !== 'main' && p} {...panelProps}>
                        {panel.render({
                            isMinified: panelProps.isMinified,
                            isVisible,
                        })}
                    </Flex>
                </MotionPanel>
                {isVisible && isOverlay && <ModalOverlay zIndex={1} onClick={() => togglePanel(name)} />}
            </Flex>
        );
    };

    const { leftPanels, rightPanels, mainPanel } = getPanels(panels);

    return (
        <CanvasContext.Provider value={{ panels, setPanel, setPanels, updatePanel, togglePanel }}>
            <Flex {...styles.style}>
                {props.children}
                {leftPanels.map((panel, i) => renderPanel(panel, i))}
                {mainPanel.map((panel, i) => renderPanel(panel, i + leftPanels.length))}
                {rightPanels.map((panel, i) => renderPanel(panel, i))}
            </Flex>
        </CanvasContext.Provider>
    );
}

const renderPanels = ({ panels = [], children = null, windowWidth = 0 }) => {
    return (
        <Flex>
            {panels.map((canvas, i) => {
                const { name, render, ...rest } = canvas;

                return (
                    <CanvasPanel
                        name={name}
                        borderRight={name !== 'main' && '1px'}
                        borderColor="border"
                        windowWidth={windowWidth}
                        {...rest}
                    >
                        {props => (
                            <>
                                {/* pass props to the component which the panel renders */}
                                {render({
                                    children: name === 'main' && children,
                                    ...props,
                                })}
                            </>
                        )}
                    </CanvasPanel>
                );
            })}
        </Flex>
    );
};

export const CanvasWrapper = props => {
    const { initialCanvasState, children } = props;
    const { windowWidth } = useWindowResize();

    return (
        <CanvasContainer initialCanvasState={initialCanvasState}>
            <CanvasContext.Consumer>
                {({ panels }) => {
                    const canvasPanels = Object.keys(panels).length > 0 && panels;

                    const { leftPanels, rightPanels, mainPanel } = getPanels(canvasPanels);

                    return (
                        <>
                            {renderPanels({
                                panels: leftPanels,
                                windowWidth,
                            })}
                            {renderPanels({
                                panels: mainPanel,
                                children,
                            })}
                            {renderPanels({
                                panels: rightPanels,
                                windowWidth,
                            })}
                        </>
                    );
                }}
            </CanvasContext.Consumer>
        </CanvasContainer>
    );
};

export function CanvasPanel({ name, children, type = 'inline', ranges, windowWidth, ...rest }) {
    const { setPanel, updatePanel } = useContext(CanvasContext);
    const ref = createRef();

    const currentWindowWidth = Math.max(1, windowWidth);

    const isOverlay = isWithinRange(currentWindowWidth, ranges?.isOverlay);
    const isMinifiable = !isOverlay && isWithinRange(currentWindowWidth, ranges?.allowMinify);
    const isMinified = isMinifiable && isWithinRange(currentWindowWidth, ranges?.defaultMinified);

    let isVisible = false;
    if (isOverlay && ranges.defaultVisible) {
        isVisible = false;
    } else {
        isVisible = name === 'main' ? true : isWithinRange(currentWindowWidth, ranges?.defaultVisible);
    }

    useEffect(() => {
        // Set the canvas panel's default vales

        setPanel(name, () => ({
            name,
            ref,
            render: children,
            type,
            ranges,
            ...rest,
        }));

        // remove panel
        return () => {
            setPanel(name, () => null);
        };
    }, []);

    useEffect(() => {
        updatePanel(name, { isMinifiable });
    }, [isMinifiable]);

    useEffect(() => {
        updatePanel(name, { isMinified });
    }, [isMinified]);

    useEffect(() => {
        updatePanel(name, { isVisible });
    }, [isVisible]);

    useEffect(() => {
        updatePanel(name, { isOverlay });
    }, [isOverlay]);

    return null;
}
