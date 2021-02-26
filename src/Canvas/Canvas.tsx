import { motion } from 'framer-motion';
import React, { createContext, createRef, useContext, useEffect, useState } from 'react';
import { Flex } from '../Flex';
import { useRouter } from '../hooks/useRouter';
import { useWindowResize } from '../hooks/useWindowResize';
import { ModalOverlay } from '../Modal';
import { PseudoBox } from '../PseudoBox';
import { useTheme } from '../ThemeProvider';
import useCanvasStyle from './styles';
import { CanvasWrapperProps } from './types';

const CanvasContext = createContext<any>(null);

export const useCanvasContext = () => {
    const context = useContext(CanvasContext);
    if (context == null) {
        throw new Error('This component must be used within the `CanvasWrapper` ');
    }
    return context;
};

const MotionPanel = motion.custom(PseudoBox);

const getPanels = panels => {
    const panelList = Object.keys(panels)
        .map(panelKey => ({ ...panels[panelKey], name: panelKey }))
        .filter(p => p);
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

    const addPanel = (name, update) => {
        setPanels($prev => {
            return {
                ...$prev,
                [name]: update($prev[name] || {}),
            };
        });
    };

    const removePanel = name => {
        const deletePanel = () => {
            setPanels($prev => {
                if (name !== 'main') {
                    const newPanelList = { ...$prev };
                    delete newPanelList[name];
                    return newPanelList;
                }
                return {
                    ...$prev,
                };
            });
        };

        // TODO: look into cleaner way of doing this
        // Hide the panel first to keep close animation, then delete from the panels object.
        updatePanel(name, {
            isVisible: false,
        });
        setTimeout(() => {
            deletePanel();
        }, 400);
    };

    const renderPanel = (panel, i) => {
        if (!panel || !(panel && panel.render)) return null;

        const {
            name,
            ref,
            children,
            isVisible,
            type,
            bg,
            isOverlay,
            p = 'canvas.spacing',
            renderProps,
            overflow,
            overflowY,
            ...panelProps
        } = panel;

        const animateTo = (isVisible && (panelProps.isMinified ? 'minified' : 'visible')) || 'hidden';
        const zIndex = Object.keys(panels).length - i;

        const panelStyleProps = {
            ...styles.panel,
            ...styles.getPanelStyle({
                width: panelProps.width || panelProps.w,
                position: panelProps.position,
                bg,
                isOverlay,
                name,
                zIndex,
            }),
        };

        return (
            <Flex
                zIndex={(isVisible && isOverlay ? zIndices.panel : 1) + zIndex}
                flexGrow={name === 'main' && 1}
                key={name}
                overflow={overflow}
                overflowY={overflowY}
            >
                <MotionPanel
                    key={`motion-${panel.name}`}
                    initial={animateTo}
                    animate={animateTo}
                    {...panelStyleProps}
                    // _track={{ backgroundColor: 'black' }}
                >
                    <Flex
                        ref={ref}
                        direction="column"
                        minH="100%"
                        h="100%"
                        p={name !== 'main' && p}
                        {...panelProps}
                        width="100%"
                    >
                        {panel.render({
                            isMinified: panelProps.isMinified,
                            isVisible,
                            ...renderProps,
                        })}
                    </Flex>
                </MotionPanel>
                {isVisible && isOverlay && <ModalOverlay zIndex={1} onClick={() => togglePanel(name)} />}
            </Flex>
        );
    };

    const { leftPanels, rightPanels, mainPanel } = getPanels(panels);

    return (
        <CanvasContext.Provider value={{ panels, addPanel, setPanels, updatePanel, togglePanel, removePanel }}>
            {props.header}
            <Flex {...styles.style}>
                {props.children}
                {leftPanels.map((panel, i) => renderPanel(panel, i))}
                {mainPanel.map((panel, i) => renderPanel(panel, i + leftPanels.length))}
                {rightPanels.map((panel, i) => renderPanel(panel, i))}
            </Flex>
        </CanvasContext.Provider>
    );
}

const renderPanels = ({ panels = [], children = null, windowWidth = 0, ...renderPanelsProps }) => {
    return (
        <Flex>
            {panels.map((canvas, i) => {
                const { name, render, renderProps, ...rest } = canvas;

                return (
                    <CanvasPanel
                        name={name}
                        borderRight={name !== 'main' && '1px'}
                        borderColor="border"
                        windowWidth={windowWidth}
                        {...renderPanelsProps}
                        {...rest}
                    >
                        {props => (
                            <>
                                {/* pass props to the component which the panel renders */}
                                {render({
                                    children: name === 'main' && children,
                                    renderProps,
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

export const CanvasWrapper = (props: CanvasWrapperProps) => {
    const { initialCanvasState, children } = props;
    const { windowWidth } = useWindowResize();

    return (
        <CanvasContainer initialCanvasState={initialCanvasState} header={props.header}>
            <CanvasContext.Consumer>
                {({ panels }) => {
                    const canvasPanels = Object.keys(panels).length > 0 && panels;

                    if (!canvasPanels) {
                        return children;
                    }

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
    const { updatePanel } = useCanvasContext();
    const { location } = useRouter();
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
        // Set the canvas panel's default values
        updatePanel(name, {
            name,
            ref,
            render: children,
            type,
            ranges,
            ...rest,
        });

        // remove panel
        // return () => {
        //     removePanel(name);
        // };
    }, []);

    useEffect(() => {
        updatePanel(name, {
            isMinifiable,
            isMinified,
            isVisible,
            isOverlay,
        });
    }, [isMinifiable, isMinified, isVisible, isOverlay]);

    useEffect(() => {
        // when a link is clicked and route changes, close overlay canvases
        if (isOverlay) {
            updatePanel(name, {
                isVisible: false,
            });
        }
    }, [location.pathname]);

    return null;
}
