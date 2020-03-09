import * as React from 'react';
import { PostActionsProps } from '../PostActions';

type PostProps = PostActionsProps & {
    message: string;
    author: any;
    date?: any;
    replies?: Array<PostProps>;
};

const Post: React.FC<PostProps>;
export default Post;
