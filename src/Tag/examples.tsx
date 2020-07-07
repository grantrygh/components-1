import { storiesOf } from '@storybook/react';
import { Tag, TagCloseButton, TagIcon, TagLabel } from '.';
import { Avatar } from '../Avatar';
import { Stack } from '../Stack';
import { ITag } from './types';

const stories = storiesOf('Tag', module);

stories.add('Default', () => {
    return (
        <Stack align="center" isInline>
            {['sm', 'md', 'lg'].map((size: ITag['size']) => (
                <Tag size={size} variant="outline">
                    Default
                </Tag>
            ))}
        </Stack>
    );
});

stories.add('with left icon', () => {
    return (
        <Stack align="center" isInline>
            {['sm', 'md', 'lg'].map((size: ITag['size']) => (
                <Tag size={size} variantColor="cyan" rounded="sm">
                    <TagIcon icon="add" size="12px" />
                    <TagLabel>Green</TagLabel>
                </Tag>
            ))}
        </Stack>
    );
});

stories.add('with right icon', () => {
    return (
        <Stack align="center" isInline>
            {['sm', 'md', 'lg'].map((size: ITag['size']) => (
                <Tag size={size} variantColor="cyan">
                    <TagLabel>Green</TagLabel>
                    <TagIcon icon="check" size="12px" />
                </Tag>
            ))}
        </Stack>
    );
});

stories.add('with close button', () => {
    return (
        <Stack align="center" isInline>
            {['sm', 'md', 'lg'].map((size: ITag['size']) => (
                <Tag size={size} variant="outline">
                    <TagLabel>Green</TagLabel>
                    <TagCloseButton />
                </Tag>
            ))}
        </Stack>
    );
});

stories.add('with custom element', () => {
    return (
        <Tag variantColor="red" rounded="full">
            <Avatar
                src="https://www.dropbox.com/s/nd8z3hxuo3ahauk/segun_adebayo.jpg?dl=1"
                size="xs"
                name="Segun Adebayo"
                ml={-1}
                mr="spacing-sm"
            />
            <TagLabel>Segun</TagLabel>
        </Tag>
    );
});
