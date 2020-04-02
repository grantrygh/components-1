import { IBadge } from '../Badge/types';

interface IFullTag {
    /**
     * circular features
     */
    rounded?: boolean;
    /**
     * The color scheme of the tag.
     */
    variantColor?: IBadge['variantColor'];

    variant?: IBadge['variant'];

    label?: string;
    subLabel?: string;

    // if true, will display a close icon with an onClick action
    onClose?: () => void;

    // Include mdi-react icon as child
    children?: any;
}

export type FullTagProps = IFullTag;
