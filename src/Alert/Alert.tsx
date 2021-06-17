import React, { createContext, useContext } from 'react';
import { Box } from '../Box';
import { BoxProps } from '../Box/types';
import { Heading } from '../Heading';
import { Icon } from '../Icon';
import { Text } from '../Text';
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

export const AlertTitle = (props: BoxProps) => <Heading kind="h6" {...props} />;

export const AlertDescription = (props: BoxProps) => <Text {...props} />;

export const AlertIcon = (props) => {
    const { status, variant } = useContext(AlertContext);
    const { status: statusProps } = useAlertStyle({ variant, status });
    const iconStyleProps = useAlertIconStyle({
        variant,
        color: props.color || status,
    });

    return (
        <Box {...iconStyleProps}>
            <Icon mr={3} size={5} name={statusProps.icon} {...props} color="inherit" />
        </Box>
    );
};
