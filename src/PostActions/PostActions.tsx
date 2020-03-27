/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import Box from '../Box';
import Button from '../Button';
import Flex from '../Flex';
import ResponseBox from '../ReponseBox';
import { usePostActionsStyle } from './styles';
import { PostActionsProps } from './types';

export const PostActions = ({ id, showActionMenu, onReply, children, menu, color }: PostActionsProps) => {
    const [showReplyBox, setShowReplyBox] = useState(false);
    const replyStyleProps = usePostActionsStyle({
        color,
    });

    return (
        <Box w="100%" py={2}>
            <Flex w="100%" justify="space-between">
                <Flex w="100%">
                    {/* // Main post actions */}
                    {children}

                    {!showReplyBox && onReply && (
                        <Button onClick={() => setShowReplyBox(!showReplyBox)} title="Reply" {...replyStyleProps}>
                            Reply
                        </Button>
                    )}
                </Flex>
                {showActionMenu && menu}
            </Flex>
            {showReplyBox && onReply && (
                <ResponseBox
                    onSubmit={message => {
                        onReply(id, message);
                        setShowReplyBox(false);
                    }}
                    onCancel={() => setShowReplyBox(false)}
                />
            )}
        </Box>
    );
};
