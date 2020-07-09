import React, { useCallback } from 'react';
import toaster from 'toasted-notes';
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '../Alert';
import { Box } from '../Box';
import { CloseButton } from '../CloseButton';
import { useColorMode } from '../ColorModeProvider';
import { ThemeProvider, useTheme } from '../ThemeProvider';
import useToastStyle from './styles';
import { ToastProps, useToastOptions } from './types';

export const Toast = ({ status, variant, id, title, isClosable, onClose, description, ...props }: ToastProps) => {
    const toastStyleProps = useToastStyle({});
    return (
        <Alert status={status} variant={variant} id={id} {...toastStyleProps} {...props}>
            <AlertIcon />
            <Box flex="1">
                {title && <AlertTitle>{title}</AlertTitle>}
                {description && <AlertDescription color="titleText">{description}</AlertDescription>}
            </Box>
            {isClosable && <CloseButton size="sm" onClick={onClose} position="absolute" right="4px" top="4px" />}
        </Alert>
    );
};

export function useToast() {
    const theme = useTheme();
    const { mode } = useColorMode();

    const notify = useCallback(
        ({
            position = 'bottom',
            duration = 5000,
            render,
            title,
            description,
            status,
            variant = 'top-accent',
            isClosable,
        }: useToastOptions) => {
            const options = {
                position,
                duration,
            };

            if (render) {
                return toaster.notify(
                    ({ onClose, id }) => (
                        <ThemeProvider defaultMode={mode} theme={theme}>
                            {render({ onClose, id })}
                        </ThemeProvider>
                    ),
                    options
                );
            }

            toaster.notify(
                ({ onClose, id }) => (
                    <ThemeProvider defaultMode={mode} theme={theme}>
                        <Toast
                            {...{
                                onClose,
                                id,
                                title,
                                description,
                                status,
                                variant,
                                isClosable,
                            }}
                        />
                    </ThemeProvider>
                ),
                options
            );

            return null;
        },
        [theme]
    );

    return notify;
}
