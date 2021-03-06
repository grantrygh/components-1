import { BoxProps } from '../Box/types';

export interface IBadge {
    /**
     * The color scheme of the badge
     *
     * 🚨Note: This should be one of the color keys in the theme that has `100` - `900` color values (e.g.`green`, `red`).
     * @see http://chakra-ui.com/theme#colors
     */
    variantColor?: string;
    /**
     * The variant of the badge
     */
    variant?: 'solid' | 'subtle' | 'outline' | 'hexagon';
}

export type BadgeProps = IBadge & BoxProps;
