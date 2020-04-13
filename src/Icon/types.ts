import { BoxProps } from '../Box/types';
import { Omit } from '../common-types';
import { Icons } from '../theme/icons';

interface IIcon {
    /**
     * The size of the icon.
     */
    size?: string;
    /**
     * The name of the icon.
     */
    name?: Icons;
    /**
     * The color of the icon.
     */
    color?: string;
    /**
     * The role of the icon. `presentation` or `img`
     */
    role?: 'presentation' | 'img';
    /**
     * If `false`, it means the icon is used within interactive
     * element and won't be focuable.
     */
    focusable?: boolean;
}

export type IconProps = IIcon & Omit<BoxProps, 'size'>;
