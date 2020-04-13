/** @jsx jsx */
import styled, * as Emotion from '@emotion/styled';
import css from '@styled-system/css';
import { Box } from '../Box';
import { transformAliasProps } from '../Box/config';
import { ControlBoxProps, IControlBox } from './types';

export const ControlBox: Emotion.StyledComponent<ControlBoxProps, {}, {}> = styled(Box)(
    ({
        type = 'checkbox',
        _hover,
        _invalid,
        _disabled,
        _focus,
        _checked,
        _child = { opacity: 0 },
        _checkedAndChild = { opacity: 1 },
        _checkedAndDisabled,
        _checkedAndFocus,
        _checkedAndHover,
    }: IControlBox) => {
        const checkedAndDisabled = `input[type=${type}]:checked:disabled + &, input[type=${type}][aria-checked=mixed]:disabled + &`;
        const checkedAndHover = `input[type=${type}]:checked:hover:not(:disabled) + &, input[type=${type}][aria-checked=mixed]:hover:not(:disabled) + &`;
        const checkedAndFocus = `input[type=${type}]:checked:focus + &, input[type=${type}][aria-checked=mixed]:focus + &`;
        const disabled = `input[type=${type}]:disabled + &`;
        const focus = `input[type=${type}]:focus + &`;
        const hover = `input[type=${type}]:hover:not(:disabled):not(:checked) + &`;
        const checked = `input[type=${type}]:checked + &, input[type=${type}][aria-checked=mixed] + &`;
        const invalid = `input[type=${type}][aria-invalid=true] + &`;

        return css({
            [focus]: transformAliasProps(_focus),
            [hover]: transformAliasProps(_hover),
            [disabled]: transformAliasProps(_disabled),
            [invalid]: transformAliasProps(_invalid),
            [checkedAndDisabled]: transformAliasProps(_checkedAndDisabled),
            [checkedAndFocus]: transformAliasProps(_checkedAndFocus),
            [checkedAndHover]: transformAliasProps(_checkedAndHover),
            '& > *': transformAliasProps(_child),
            [checked]: {
                ...transformAliasProps(_checked),
                '& > *': transformAliasProps(_checkedAndChild),
            },
        });
    }
);

ControlBox.defaultProps = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 120ms',
    flexShrink: 0,
    'aria-hidden': 'true',
};
