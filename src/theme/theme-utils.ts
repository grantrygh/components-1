export const extendStyle = (getDefaultStyle, newStyle) => (props, theme) => {
    const defaultStyle = getDefaultStyle(props);

    for (const key in defaultStyle) {
        for (const $key in defaultStyle[key]) {
            console.log($key, defaultStyle[key]);
        }
    }

    return defaultStyle;
};
