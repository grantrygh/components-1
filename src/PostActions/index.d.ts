import * as React from 'react';

// props passed down through the Post component
export interface IPostActionsProps {
    id: string;

    // actions. passing values for these will display buttons beneath the post
    // if no value is passed (or set to null), no action button will display
    onLike?: (id: string) => void;
    onDislike?: (id: string) => void;
    onReply?: (id: string) => void;

    // menu options
    onReport?: (id: string) => void;
}

// props defined and passed from the Post component itself
interface IPostActions {
    showActionMenu?: boolean;

    // labels
    numLikes?: number | string;
    numDislikes?: number | string;
}

declare const PostActions: React.FC<IPostActionsProps & IPostActions>;
export default PostActions;
