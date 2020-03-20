/** @jsx jsx */
import { jsx } from '@emotion/core';
import Icon from '.';
import { Box } from '../Box';

const EnhancedIcon = ({ icon, ...props }) => {
    if (typeof icon === 'string') {
        return <Icon focusable="false" name={icon} color="currentColor" {...props} />;
    }
    return <Box as={icon} data-custom-icon focusable="false" color="currentColor" {...props} />;
};

export default EnhancedIcon;
