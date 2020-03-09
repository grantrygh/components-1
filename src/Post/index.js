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
    const { message, author, date, replies, ...rest } = props;
    const [showReplies, setShowReplies] = useState(false);

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

                {/* // TODO: numLikes & dislikes just temporary. change with known structure */}
                <PostActions numLikes={message.length} numDislikes={author.name.length} {...rest} />

                {replies && replies.length > 0 && (
                    <Box>
                        <Box py="8px">
                            <Link onClick={() => setShowReplies(!showReplies)} color="blue.500">
                                {showReplies ? 'Hide' : 'View'} {replies.length}{' '}
                                {replies.length === 1 ? 'reply' : 'replies'}
                                <Icon name={showReplies ? 'chevron-up' : 'chevron-down'} />{' '}
                            </Link>
                        </Box>
                        {showReplies && (
                            <Box w="100%">
                                {replies.map(reply => (
                                    <Post
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
