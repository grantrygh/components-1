/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import Box from '../Box';
import Button from '../Button';
import Flex from '../Flex';
import Icon from '../Icon';
import Menu, { MenuButton, MenuItem, MenuList } from '../Menu';
import ResponseBox from '../ReponseBox';

const PostActions = ({ id, showActionMenu, onReply, onLike, onDislike, onReport, numLikes, numDislikes }) => {
    const [showReplyBox, setShowReplyBox] = useState(false);

    const buttonActionStyle = {
        textTransform: 'uppercase',
        fontSize: 'xs',
    };

    const actions = [
        // Like
        {
            title: 'Like',
            icon: 'chevron-up',
            label: numLikes, // TODO: replace with posts.likes
            onClick: id => onLike(id),
            skip: !onLike,
        },
        // Dislike
        {
            title: 'Dislike',
            icon: 'chevron-down',
            label: numDislikes, // TODO: replace with posts.dislikes
            onClick: id => onDislike(id),
            skip: !onDislike,
        },
    ];

    if (actions && actions.filter(a => !a.skip).length === 0 && !onReply) {
        return null;
    }

    // TODO: if the viewer has already liked/disliked a post, set a state on the button to not allow duplicate actions

    return (
        <Box w="100%" py="8px">
            <Flex w="100%" justify="space-between">
                <Flex w="100%">
                    {actions &&
                        actions.map(action => {
                            if (!action.skip) {
                                return (
                                    <Button
                                        mr="8px"
                                        size="sm"
                                        onClick={() => action.onClick(id)}
                                        variant="outline"
                                        leftIcon={action.icon}
                                        title={action.title}
                                        key={action.title + id}
                                        {...buttonActionStyle}
                                    >
                                        {action.label}
                                    </Button>
                                );
                            }
                        })}
                    {!showReplyBox && onReply && (
                        <Button
                            mr="8px"
                            size="sm"
                            onClick={() => setShowReplyBox(!showReplyBox)}
                            {...buttonActionStyle}
                            variant="outline"
                            color="blue.500"
                            title="Reply"
                        >
                            Reply
                        </Button>
                    )}
                </Flex>
                {showActionMenu && onReport && (
                    <Menu>
                        <MenuButton as={Button} size="sm" variant="ghost">
                            <Icon name="settings" />
                        </MenuButton>

                        <MenuList minWidth="200px">
                            <MenuItem onClick={() => onReport(id)}>Report</MenuItem>
                        </MenuList>
                    </Menu>
                )}
            </Flex>
            {showReplyBox && onReply && (
                <ResponseBox
                    onSubmit={message => {
                        onReply({
                            id,
                            message,
                        });
                        setShowReplyBox(false);
                    }}
                    onCancel={() => setShowReplyBox(false)}
                />
            )}
        </Box>
    );
};

PostActions.displayName = 'PostActions';

export default PostActions;
