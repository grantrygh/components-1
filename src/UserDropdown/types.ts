import { FlexProps } from '../Flex/types';

interface IUserDropdown {
    variant?: 'full' | 'compact';
}

export type UserDopdownProps = IUserDropdown & FlexProps;
