import React, { createContext, createRef, useContext, useEffect, useState } from 'react';
import { Flex } from '../Flex';
import useCanvasStyle from './styles';

export const CanvasContext = createContext<any>(null);

export function CanvasContainer({ initialState = {}, ...props }) {
    const [panels, setPanels] = useState<any>({});
    const styles = useCanvasStyle(props);

    const setPanel = (name, update) => {
        setPanels($prev => ({
            ...$prev,
            [name]: update($prev[name] || {}),
        }));
    };

    const togglePanel = name => {
        setPanels($prev => ({
            ...$prev,
            [name]: { ...$prev[name], isVisible: !$prev[name]?.isVisible },
        }));
    };

    return (
        <CanvasContext.Provider value={{ panels, setPanel, setPanels, togglePanel }}>
            <Flex {...styles.style}>
                {props.children}
                {Object.keys(panels).map(panelKey => {
                    const panel = panels[panelKey];

                    if (!panel) return null;

                    const { name, ref, children, isVisible, type, ...panelProps } = panel;

                    return (
                        <Flex
                            ref={ref}
                            key={panelKey}
                            {...styles.panel}
                            direction="column"
                            display={!isVisible && 'none'}
                            // grow if main
                            // you can override via props
                            flexGrow={name === 'main' && '1'}
                            {...panelProps}
                        >
                            {panel.render()}
                        </Flex>
                    );
                })}
            </Flex>
        </CanvasContext.Provider>
    );
}

// TODO: implement panel type override to overlay if there isn't enough space
const getPanelType = (panels, props) => {
    const panel = panels[props.name];

    if (!panel) return null;

    return panel.type;
};

export function CanvasPanel({ name, children, isVisible = true, type = 'overlay', ...rest }) {
    const { panels, setPanel } = useContext(CanvasContext);
    const ref = createRef();

    console.log(panels);

    useEffect(() => {
        setPanel(name, () => ({ name, ref, render: children, isVisible, type, ...rest }));

        // remove panel
        return () => {
            setPanel(name, () => null);
        };
    }, []);

    return null;
}
