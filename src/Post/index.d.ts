import * as React from 'react';
import { PostActionsProps } from '../PostActions';

type PostProps = PostActionsProps & {
    message: string;
    author: any;
    date?: any;
    replies?: Array<PostProps>;

    // actions. passing values for these will display buttons beneath the post
    // if no value is passed (or set to null), no action button will display
    onLike?: any;
    onDislike?: any;
    onReply?: any;
};

const Post: React.FC<PostProps>;
export default Post;
