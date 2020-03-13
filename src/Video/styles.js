/** @jsx jsx */

const isStuckStyle = {
    zIndex: 100,
    maxWidth: '350px',
    maxHeight: '200px',
    bottom: 4,
    right: 4,
    position: 'fixed',
    borderRadius: 2,
    boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.2), 0 3px 7px 0 rgba(0, 0, 0, 0.26)',
};

const videoStyle = {
    position: 'relative',
    overflow: 'hidden',
    backgroundSize: 'cover',
    maxWidth: '100%',
    width: 'fit-content',
};

export { videoStyle, isStuckStyle };
