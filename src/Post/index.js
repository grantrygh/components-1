/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import Avatar from '../Avatar';
import Box from '../Box';
import Flex from '../Flex';
import Icon from '../Icon';
import Link from '../Link';
import PostActions from '../PostActions';
import Text from '../Text';

const Post = props => {
    const { message, author, date, replies, avatar, onLike, onDislike, ...rest } = props;
    const [showReplies, setShowReplies] = useState(false);

    const postActions = [
        // Like
        {
            icon: 'chevron-up',
            label: message.length, // TODO: replace with posts.likes
            onClick: id => onLike(id),
            skip: !onLike,
        },
        // Dislike
        {
            icon: 'chevron-down',
            label: '4', // TODO: replace with posts.dislikes
            onClick: id => onDislike(id),
            skip: !onDislike,
        },
    ];

    return (
        <Flex w="100%" py="8px">
            <Avatar size="sm" mr="16px" name={author.name} src={author.avatar} />
            <Box flexGrow="1">
                <Flex fontSize="sm">
                    <Text fontWeight="bold" mr="8px">
                        {author.name}
                    </Text>
                    <Text color="gray.600">{date}</Text>
                </Flex>
                <Text my="2px">{message}</Text>

                <PostActions actions={postActions} {...rest} />

                {replies && replies.length > 0 && (
                    <Box>
                        <Box py="8px">
                            <Link onClick={() => setShowReplies(!showReplies)} color="blue.500">
                                {showReplies ? 'Hide' : 'View'} {replies.length} replies
                                <Icon name={showReplies ? 'chevron-up' : 'chevron-down'} />{' '}
                            </Link>
                        </Box>
                        {showReplies && (
                            <Box w="100%">
                                {replies.map(reply => (
                                    <Post
                                        {...props}
                                        {...rest}
                                        author={reply.author}
                                        message={reply.message}
                                        date={reply.date}
                                        replies={reply.replies}
                                        id={reply.id}
                                    />
                                ))}
                            </Box>
                        )}
                    </Box>
                )}
            </Box>
        </Flex>
    );
};

Post.displayName = 'Post';

export default Post;
