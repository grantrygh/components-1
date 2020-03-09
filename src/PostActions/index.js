/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import Box from '../Box';
import Button from '../Button';
import Flex from '../Flex';
import ResponseBox from '../ReponseBox';

const PostActions = ({ id, onReply, onLike, onDislike, numLikes, numDislikes }) => {
    const [showReplyBox, setShowReplyBox] = useState(false);

    const buttonActionStyle = {
        textTransform: 'uppercase',
        fontSize: 'xs',
    };

    const actions = [
        // Like
        {
            icon: 'chevron-up',
            label: numLikes, // TODO: replace with posts.likes
            onClick: id => onLike(id),
            skip: !onLike,
        },
        // Dislike
        {
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
            <Flex w="100%">
                {actions &&
                    actions.map(action => {
                        console.log(action);
                        if (!action.skip) {
                            return (
                                <Button
                                    mr="8px"
                                    size="sm"
                                    onClick={() => action.onClick(id)}
                                    variant="outline"
                                    leftIcon={action.icon}
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
                    >
                        Reply
                    </Button>
                )}
            </Flex>
            {showReplyBox && onReply && (
                <ResponseBox
                    onSubmit={() => {
                        onReply(id);
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
