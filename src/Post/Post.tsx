/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Children, cloneElement, isValidElement, useState } from 'react';
import Avatar from '../Avatar';
import Box from '../Box';
import Button from '../Button';
import Flex from '../Flex';
import Icon from '../Icon';
import { usePostActionsStyle } from '../PostActions/styles';
import Text from '../Text';
import { useWindowResize } from '../utils';
import usePostStyle from './styles';

export const Post = props => {
    const { message, author, date, replies, children, ...rest } = props;
    const [showReplies, setShowReplies] = useState(false);

    // desktop - submenu shows on post hover. mobile - always shows
    const { windowWidth } = useWindowResize();
    const mobile = windowWidth <= 768;
    const [showActionMenu, setShowActionMenu] = useState(mobile);
    const handleMouseAction = show => {
        if (!mobile) {
            setShowActionMenu(show);
        }
    };

    const PostActionChild = () => {
        if (!children) {
            return null;
        }
        return Children.map(children, (child, index) => {
            if (!isValidElement(child)) return null;

            return cloneElement(child, {
                // @ts-ignore
                showActionMenu,
            });
        });
    };

    const postStyleProps = usePostStyle({});
    const actionStyleProps = usePostActionsStyle({});

    return (
        <Flex w="100%" py={2} fontSize={['sm', 'md']}>
            <Avatar name={author.name} src={author.avatar} {...postStyleProps.avatar} />
            <Box flexGrow="1">
                <Box onMouseEnter={() => handleMouseAction(true)} onMouseLeave={() => handleMouseAction(false)}>
                    <Flex align="center" justify="space-between" fontSize={['xs', 'sm']}>
                        <Text {...postStyleProps.author}>{author.name}</Text>
                        <Text {...postStyleProps.date}>{date}</Text>
                    </Flex>
                    <Text my={2}>{message}</Text>

                    {/* Post actions */}
                    <PostActionChild />
                </Box>

                {replies && replies.length > 0 && (
                    <Box>
                        <Box py={2}>
                            <Button onClick={() => setShowReplies(!showReplies)} {...actionStyleProps} variant="ghost">
                                {showReplies ? 'Hide' : 'View'} {replies.length}{' '}
                                {replies.length === 1 ? 'reply' : 'replies'}
                                <Icon name={showReplies ? 'chevron-up' : 'chevron-down'} />{' '}
                            </Button>
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
                                        key={reply.id}
                                    >
                                        <PostActionChild />
                                    </Post>
                                ))}
                            </Box>
                        )}
                    </Box>
                )}
            </Box>
        </Flex>
    );
};
