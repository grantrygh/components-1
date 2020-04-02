import { componentStyleDef } from '../theme/types';
import { useTheme } from '../ThemeProvider';

function canvasPanelStyle({ type, isInline, isOverlay }, theme) {
    if (type === 'main') return {};

    const style: any = {
        // isInline takes precedence
        position: isInline ? 'relative' : 'absolute',
        height: isInline ? undefined : '100vh',
        transition: '200ms ease',
        zIndex: isInline ? undefined : theme.zIndices.sticky,
    };

    if (type === 'drawer') {
        style.left = '0';
        style.transform = 'translateX(-100%)';

        if (isOverlay || isInline) style.transform = 'translateX(0)';
    }

    if (type === 'sidebar') {
        style.right = '0';
        style.transform = 'translateX(100%)';

        if (isOverlay || isInline) style.transform = 'scaleX(-100%)';
    }

    return style;
}

export const canvasStyle: componentStyleDef = (props, theme) => ({
    canvasPanel: canvasPanelStyle(props, theme),
    canvasOverlay: props.isInline
        ? {}
        : {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: theme.zIndices.sticky,
              backgroundColor: 'overlayBg',
              visibility: props.isOverlay ? 'visible' : 'hidden',
              cursor: 'pointer',
          },
    style: {
        minHeight: '100vh',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

const useCanvasStyle = props => {
    const theme = useTheme();
    const { style, ...styles } = theme['styles'].canvas
        ? theme['styles'].canvas(props, theme)
        : canvasStyle(props, theme);

    return {
        ...style,
        ...styles,
    };
};

export default useCanvasStyle;
