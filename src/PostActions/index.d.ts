import * as React from 'react';

export type PostActionsProps = {
    id: string;

    // actions. passing values for these will display buttons beneath the post
    // if no value is passed (or set to null), no action button will display
    onLike?: any;
    onDislike?: any;
    onReply?: any;

    // labels
    numLikes?: number;
    numDislikes?: number;
};

const PostActions: React.FC<PostActionsProps>;
export default PostActions;
