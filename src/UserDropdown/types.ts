import { FlexProps } from '../Flex';

interface IUserDropdown {
    variant?: 'full' | 'compact';
}

export type UserDopdownProps = IUserDropdown & FlexProps;
