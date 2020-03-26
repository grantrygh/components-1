import { MenuProps } from '../Menu/types';

// props passed down through the Post component
interface IPostActionsProps {
    id?: string;

    // Pass an onReply action to show the reply button
    // contained within the component to avoid needing to handle the ResponseBox visibility in the parent
    onReply?: (id: string, message: string) => void;

    showActionMenu?: boolean;

    // optional secondary-action menu to display on post hover
    menu?: React.FC<MenuProps>;

    children?: any;
}

export type PostActionsProps = IPostActionsProps;
