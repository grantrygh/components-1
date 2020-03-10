/** @jsx jsx */
import { jsx } from '@emotion/core';
import { storiesOf } from '@storybook/react';
import Post from '.';
import Box from '../Box';
import ResponseBox from '../ReponseBox';

const stories = storiesOf('Post', module).addDecorator(story => (
    <Box maxWidth="800px" mx="auto" mt={8} p={3}>
        {story()}
    </Box>
));

stories.add('no replies', () => {
    return <Post author={{ name: 'Test Name' }} message="This is a test message" date="March 1, 2020" />;
});

stories.add('with replies', () => {
    return (
        <Post
            author={{ name: 'Test Name' }}
            message="This is a test message"
            date="March 1, 2020"
            replies={[
                {
                    message: 'hey, I agree',
                    author: {
                        name: 'John Smith',
                    },
                    date: 'March 2, 2020',
                },
            ]}
        />
    );
});

const postList = [
    {
        id: 1,
        author: { name: 'James Miller' },
        message:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa id neque aliquam vestibulum. Sem integer vitae justo eget magna. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices. Nibh sed pulvinar proin gravida. Diam vel quam elementum pulvinar. Purus semper eget duis at tellus at urna condimentum. Ac turpis egestas integer eget aliquet nibh praesent tristique magna. Massa eget egestas purus viverra accumsan in nisl nisi. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo.',
        date: 'March 1, 2020',
    },
    {
        id: 2,
        author: { name: 'Kelly Williams' },
        message: 'This is a test message',
        date: 'March 1, 2020',
    },
    {
        id: 3,
        author: { name: 'Jane Goodwin' },
        message:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa id neque aliquam vestibulum. Sem integer vitae justo eget magna. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices.',
        date: 'March 3, 2020',
        replies: [
            {
                id: 5,
                message: 'hey, I agree',
                author: {
                    name: 'John Smith',
                },
                date: 'March 7, 2020',
            },
        ],
    },
    {
        id: 4,
        author: { name: 'Thomas Johnson' },
        message:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa id neque aliquam vestibulum. Sem integer vitae justo eget magna. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices.',
        date: 'March 4, 2020',
    },
    {
        id: 6,
        author: { name: 'Jane Goodwin' },
        message:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa id neque aliquam vestibulum. Sem integer vitae justo eget magna. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices.',
        date: 'March 3, 2020',
        replies: [
            {
                id: 7,
                message: 'hey, I agree',
                author: {
                    name: 'John Smith',
                },
                date: 'March 7, 2020',
                replies: [
                    {
                        id: 8,
                        message: 'reply to a reply',
                        author: {
                            name: 'Johnny Appleseed',
                        },
                        date: 'March 12, 2020',
                    },
                ],
            },
        ],
    },
];

stories.add('comments section - no actions', () => {
    return (
        <Box>
            <Box pb="16px">
                <ResponseBox />
            </Box>
            {postList.map(post => (
                <Post
                    author={post.author}
                    message={post.message}
                    date={post.date}
                    replies={post.replies}
                    id={post.id}
                />
            ))}
        </Box>
    );
});

stories.add('comments section - with actions', () => {
    return (
        <Box>
            <Box pb="16px">
                <ResponseBox />
            </Box>
            {postList.map(post => (
                <Post
                    author={post.author}
                    message={post.message}
                    date={post.date}
                    replies={post.replies}
                    id={post.id}
                    onReply={id => console.log('replied to post id: ', id)}
                    onLike={id => console.log('liked post id: ', id)}
                    onDislike={id => console.log('disliked post id: ', id)}
                    onReport={id => console.log('reported post id: ', id)}
                />
            ))}
        </Box>
    );
});
