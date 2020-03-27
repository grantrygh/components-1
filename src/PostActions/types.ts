import { BoxProps } from '../Box/types';

// props passed down through the Post component
interface IPostActionsProps {
    id?: string;

    // Pass an onReply action to show the reply button
    // contained within the component to avoid needing to handle the ResponseBox visibility in the parent
    onReply?: (id: string, message: string) => void;

    showActionMenu?: boolean;

    // optional secondary-action <Menu> to display on post hover
    menu?: any;
}

export type PostActionsProps = IPostActionsProps & BoxProps;
