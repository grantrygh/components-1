import * as React from 'react';

export type PostActionsProps = {
    actions?: Array<{
        label?: string;
        icon?: string;
        onClick: any;
    }>;

    onReply?: any;
    id: string;
};

const PostActions: React.FC<PostActionsProps>;
export default PostActions;
