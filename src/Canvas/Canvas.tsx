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

export function CanvasContainer(props) {
    const [panels, setPanels] = useState<any>({});
    const { sizes } = useTheme();

    const { windowWidth } = useWindowResize();
    const isMobile = windowWidth < sizes.canvas.breakpoint;

    const styles = useCanvasStyle({
        ...props,
        isMobile,
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
            return {
                ...$prev,
                [name]: {
                    ...panel,
                    // if desktop and panel can be minified, minify rather than hiding
                    // if mobile, skip minifiable and either show or hide
                    isVisible: !panel?.isMinifiable || isMobile ? !panel?.isVisible : panel?.isVisible,
                    isMinified: panel?.isMinifiable || isMobile ? !panel?.isMinified : panel?.isMinified,
                },
            };
        });
    };

    const renderPanel = panel => {
        if (!panel || !(panel && panel.render)) return null;

        const { name, ref, children, isVisible, type, bg, p = 'canvas.spacing', ...panelProps } = panel;

        const animateTo = (isVisible && (panelProps.isMinified ? 'minified' : 'visible')) || 'hidden';

        const isOverlay = (type === 'overlay' || isMobile) && name !== 'main';

        const panelStyleProps = {
            ...styles.panel,
            ...styles.getPanelStyle({
                width: panelProps.width,
                position: panelProps.position,
                bg,
                isOverlay,
                name,
            }),
        };

        return (
            <>
                <MotionPanel key={panel.name} initial={animateTo} animate={animateTo} {...panelStyleProps}>
                    <Flex
                        ref={ref}
                        direction="column"
                        height="100%"
                        p={name !== 'main' && p}
                        flexGrow={name === 'main' && '1'}
                        {...panelProps}
                    >
                        {panel.render(panelProps)}
                    </Flex>
                </MotionPanel>
                {isVisible && isOverlay && <ModalOverlay onClick={() => togglePanel(name)} />}
            </>
        );
    };

    const { leftPanels, rightPanels, mainPanel } = getPanels(panels);

    return (
        <CanvasContext.Provider value={{ panels, setPanel, setPanels, updatePanel, togglePanel }}>
            <Flex {...styles.style}>
                {props.children}
                {leftPanels.map(panel => renderPanel(panel))}
                {mainPanel.map(panel => renderPanel(panel))}
                {rightPanels.map(panel => renderPanel(panel))}
            </Flex>
        </CanvasContext.Provider>
    );
}

// TODO: implement panel type override to overlay if there isn't enough space
// const getPanelType = (panels, props) => {
//     const panel = panels[props.name];

//     if (!panel) return null;

//     return panel.type;
// };

export function CanvasPanel({ name, children, isVisible = true, type = 'inline', isMinified, ...rest }) {
    const { setPanel, updatePanel } = useContext(CanvasContext);
    const ref = createRef();

    useEffect(() => {
        setPanel(name, () => ({ name, ref, render: children, isVisible, type, isMinified, ...rest }));

        // remove panel
        return () => {
            setPanel(name, () => null);
        };
    }, []);

    useEffect(() => {
        updatePanel(name, { isMinified });
    }, [isMinified]);

    return null;
}

export const renderPanels = (panels = [], children = null) => {
    /**
     * if an earlier index and a later one is not minified, the former should be minified by default
     * get the reversed index of the last non-minified panel
     */
    const panelsCopy = [...panels];
    const minifiedPanels = panelsCopy.reverse().findIndex(p => !p.isMinified && p.isVisible);
    // get the index of the last non-minified
    const lastIndex = minifiedPanels > -1 && panels.length - minifiedPanels - 1;

    return (
        <Flex>
            {panels.map((canvas, i) => {
                const { name, isMinified = false, render, ...rest } = canvas;
                const isPanelMinified = i < lastIndex;

                return (
                    <CanvasPanel name={name} isMinified={isPanelMinified} border="1px" borderColor="border" {...rest}>
                        {props => (
                            <>
                                {render({
                                    isMinified: isPanelMinified,
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
    return (
        <CanvasContainer>
            <CanvasContext.Consumer>
                {({ panels }) => {
                    const canvasPanels = Object.keys(panels).length > 0 ? panels : initialCanvasState;

                    const { leftPanels, rightPanels, mainPanel } = getPanels(canvasPanels);

                    return (
                        <>
                            {renderPanels(leftPanels)}
                            {renderPanels(mainPanel, children)}
                            {renderPanels(rightPanels)}
                        </>
                    );
                }}
            </CanvasContext.Consumer>
        </CanvasContainer>
    );
};
