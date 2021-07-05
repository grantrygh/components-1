import { passwordStrength } from 'check-password-strength';
import React from 'react';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { useFormField } from '../Form/useFormField';
import { AnimatedProgressIndicatorBar } from '../Progress/AnimatedProgressIndicator';
import usePasswordStrengthStyle from './styles';
import { PasswordStrengthProps } from './types';

export const PasswordStrength = ({ fieldName = 'password', customOverrides, ...props }: PasswordStrengthProps) => {
    const { value: pwValue } = useFormField({
        name: fieldName,
    });

    const strength = passwordStrength(pwValue, customOverrides);

    const { barStyle, strengthStyle } = usePasswordStrengthStyle({ id: strength?.id });

    return (
        <Box>
            <Flex gridGap="spacing-sm" mt="spacing-sm" {...props}>
                {/* // 4 bars - too weak with a value, weak, medium, strong. no color if too weak and no value */}
                {[0, 1, 2, 3].map((barI) => {
                    let barColorProps = null;
                    if (strength?.id >= barI && strength?.length > 0) {
                        barColorProps = strengthStyle;
                    }
                    return (
                        <AnimatedProgressIndicatorBar
                            key={barI}
                            min={0}
                            max={1}
                            value={barColorProps ? 1 : 0}
                            baseColor={barStyle?.bg}
                            {...barStyle}
                            {...(barColorProps || {})}
                        />
                    );
                })}
            </Flex>
        </Box>
    );
};
