import * as React from 'react';
import { BoxProps } from '../Box/types';
import { Omit } from '../common-types';
import { PseudoBoxProps } from '../PseudoBox';

interface IAccordion {
    /**
     * If `true`, multiple accordion items can be expanded at once.
     */
    allowMultiple?: boolean;
    /**
     * If `true`, any expanded accordion item can be collapsed again.
     */
    allowToggle?: boolean;
    /**
     * The index(es) of the expanded accordion item
     */
    index?: number | number[];
    /**
     * The initial index(es) of the expanded accordion item
     */
    defaultIndex?: number | number[];
    /**
     * The callback invoked when accordion items are expanded or collapsed.
     */
    onChange?: (expandedIndex?: number | number[]) => void;
    /**
     * The content of the accordion. Must be `AccordionItem`
     */
    children: React.ReactNode;
}

export type AccordionProps = IAccordion & Omit<BoxProps, 'onChange'>;

interface IAccordionItemRenderProps {
    isExpanded?: boolean;
    isDisabled?: boolean;
}

type AccordionItemChildren =
    | { children(props: IAccordionItemRenderProps): React.ReactNode }
    | { children: React.ReactNode };

interface IAccordionItem {
    /**
     * If `true`, expands the accordion in the controlled mode.
     */
    isOpen?: boolean;
    /**
     * If `true`, expands the accordion by on initial mount.
     */
    defaultIsOpen?: boolean;
    /**
     * If `true`, the accordion header will be disabled.
     */
    isDisabled?: boolean;
    /**
     * A unique id for the accordion item.
     */
    id?: string;
    /**
     * The callback fired when the accordion is expanded/collapsed.
     */
    onChange?: (isOpen: boolean) => void;
}

export type AccordionItemProps = IAccordionItem & AccordionItemChildren & PseudoBoxProps;
export type AccordionHeaderProps = PseudoBoxProps & React.ButtonHTMLAttributes<any>;

interface IAccordionContext {
    panelId?: string;
    headerId?: string;
    onToggle?: () => void;
}

export type AccordionContextProps = IAccordionContext & IAccordionItemRenderProps;
