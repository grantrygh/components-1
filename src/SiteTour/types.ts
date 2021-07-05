import { ReactElement } from 'react';

export interface SiteTourProps {
    // If selectorId is passed, tour will render a popover attached to the referenced element
    // If no selectorId is passed, tour will render a centered modal
    tourSteps: Array<{ content: ReactElement; selectorId: string }>;

    // show/hide the skip tutorial button. Defaults to true
    allowSkip?: boolean;

    // if true, site tour starts open when rendered
    isDefaultOpen?: boolean;

    // additional action to be performed when the tour closes
    onClose?: Function;

    // optionally override default footer navigation section with custom component.
    //
    renderNav?: (props: RenderTourNavProps) => ReactElement;
}

export interface FooterNavProps {
    isFirst: boolean;
    isLast: boolean;
    onPrev: React.MouseEventHandler<HTMLAnchorElement>;
    onNext: React.MouseEventHandler<HTMLAnchorElement>;
    onClose: React.MouseEventHandler<HTMLAnchorElement>;
    allowSkip?: SiteTourProps['allowSkip'];
}

export type RenderTourNavProps = Omit<FooterNavProps, 'allowskip'> & { currentStep?: number };
