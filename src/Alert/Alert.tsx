import React, { createContext, useContext } from 'react';
import Box from '../Box';
import { BoxProps } from '../Box/types';
import Icon from '../Icon';
import useAlertStyle, { useAlertIconStyle } from './styles';
import { AlertProps, IAlert } from './types';

export const statuses = {
    info: { icon: 'info', color: 'info' },
    warning: { icon: 'warning-2', color: 'warning' },
    success: { icon: 'check-circle', color: 'success' },
    error: { icon: 'warning', color: 'error' },
};

const AlertContext = createContext<IAlert>({});

/**
 * Alerts are used to communicate a state that affects a system, feature or page
 */
export const Alert = ({ status = 'info', variant = 'subtle', ...rest }: AlertProps) => {
    const alertStyleProps = useAlertStyle({
        variant,
        color: statuses[status] && statuses[status]['color'],
    });

    const context = { status, variant };

    return (
        <AlertContext.Provider value={context}>
            <Box role="alert" {...alertStyleProps} {...rest} />
        </AlertContext.Provider>
    );
};

export const AlertTitle = (props: BoxProps) => <Box fontWeight="bold" lineHeight="normal" {...props} />;

export const AlertDescription = (props: BoxProps) => <Box {...props} />;

export const AlertIcon = props => {
    const { status, variant } = useContext(AlertContext);
    const iconStyleProps = useAlertIconStyle({
        variant,
        color: statuses[status] && statuses[status]['color'],
    });

    return <Icon mr={3} size={5} name={statuses[status] && statuses[status]['icon']} {...iconStyleProps} {...props} />;
};
