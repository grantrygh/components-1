
import { Icon } from '.';
import { Box } from '../Box';
import { Icons } from '../theme/icons';

type EnhancedIconProps = {
    icon?: Icons;
};

export const EnhancedIcon = ({ icon, ...props }: EnhancedIconProps) => {
    if (typeof icon === 'string') {
        return <Icon focusable={false} name={icon} color="currentColor" {...props} />;
    }
    return <Box as={icon} data-custom-icon focusable="false" color="currentColor" {...props} />;
};
