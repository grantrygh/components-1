import * as React from 'react';
import { IPostActionsProps } from '../PostActions';

type PostProps = IPostActionsProps & {
    message: string;
    author: {
        name?: string;
        avatar?: string; // avatar src
    };
    date?: any;
    replies?: Array<PostProps>;
};

declare const Post: React.FC<PostProps>;
export default Post;
