import React, { createContext, useContext } from 'react';
import Box from '../Box';
import Icon from '../Icon';
import { useAlertIconStyle, useAlertStyle } from './styles';

export const statuses = {
    info: { icon: 'info', color: 'blue' },
    warning: { icon: 'warning-2', color: 'orange' },
    success: { icon: 'check-circle', color: 'green' },
    error: { icon: 'warning', color: 'red' },
};

interface IAlertContext {
    status?: string;
    variant?: string;
}

const AlertContext = createContext<IAlertContext>({});

const Alert = ({ status = 'info', variant = 'subtle', ...rest }) => {
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

const AlertTitle = props => <Box fontWeight="bold" lineHeight="normal" {...props} />;
const AlertDescription = props => <Box {...props} />;

const AlertIcon = props => {
    const { status, variant } = useContext(AlertContext);
    const iconStyleProps = useAlertIconStyle({
        variant,
        color: statuses[status] && statuses[status]['color'],
    });

    return (
        <Icon
            // mt={1}
            mr={3}
            size={5}
            name={statuses[status] && statuses[status]['icon']}
            {...iconStyleProps}
            {...props}
        />
    );
};

export { Alert, AlertTitle, AlertDescription, AlertIcon };
