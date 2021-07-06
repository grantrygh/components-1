import { ReactElement } from 'react';
import { ButtonProps } from '../Button/types';
import { TableCellProps } from '../Table/types';

export interface CriticalActionsTdProps extends TableCellProps {
    actions: Array<
        ButtonProps & {
            label: string;
            iconOnlyMobile?: boolean;
        }
    >;

    // if more than 1 action, actions will be converted into a vertical dot menu button
    mobileMenu?: boolean;

    // replace default icon
    mobileMenuIcon?: ReactElement;
}
