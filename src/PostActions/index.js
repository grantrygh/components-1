/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import Box from '../Box';
import Button from '../Button';
import Flex from '../Flex';
import Icon from '../Icon';
import ResponseBox from '../ReponseBox';

const PostActions = ({ id, actions, onReply }) => {
    const [showReplyBox, setShowReplyBox] = useState(false);

    const buttonActionStyle = {
        textTransform: 'uppercase',
        fontSize: 'xs',
    };

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
                                    {...buttonActionStyle}
                                    variant="outline"
                                >
                                    {action.icon && <Icon name={action.icon} />}
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
                    >
                        Reply
                    </Button>
                )}
            </Flex>
            {showReplyBox && onReply && (
                <ResponseBox onSubmit={() => onReply(id)} onCancel={() => setShowReplyBox(false)} />
            )}
        </Box>
    );
};

PostActions.displayName = 'PostActions';

export default PostActions;
