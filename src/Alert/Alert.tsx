import React, { createContext, useContext } from 'react';
import { Box } from '../Box';
import { BoxProps } from '../Box/types';
import { Icon } from '../Icon';
import useAlertStyle, { useAlertIconStyle } from './styles';
import { AlertProps, IAlert } from './types';

const AlertContext = createContext<IAlert>({});

/**
 * Alerts are used to communicate a state that affects a system, feature or page
 */
export const Alert = ({ status = 'info', variant = 'left-accent', ...rest }: AlertProps) => {
    const { root: alertStyleProps } = useAlertStyle({
        variant,
        status,
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
    const { status: statusProps } = useAlertStyle({ variant, status });
    const iconStyleProps = useAlertIconStyle({
        variant,
        color: props.color || status,
    });

    return <Icon mr={3} size={5} name={statusProps.icon} {...iconStyleProps} {...props} />;
};
