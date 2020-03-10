import * as React from 'react';

export type PostActionsProps = {
    id: string;

    showActionMenu?: boolean;

    // actions. passing values for these will display buttons beneath the post
    // if no value is passed (or set to null), no action button will display
    onLike?: (id: string) => void;
    onDislike?: (id: string) => void;
    onReply?: (id: string) => void;
    onReport?: (id: string) => void;

    // labels
    numLikes?: number | string;
    numDislikes?: number | string;
};

const PostActions: React.FC<PostActionsProps>;
export default PostActions;
