export type PostProps = {
    message: string;
    author: {
        name?: string;
        avatar?: string; // avatar src
    };
    date?: any;
    replies?: Array<PostProps>;
};
