import { BoxProps } from 'Box/types';

interface IStepper {
    // Array of steps in the steper
    steps?: Array<any>;

    // Index of the currently active step passed in.
    activeStep: number;

    // object of indices that track whether the step is completed
    /**
     * completed: {
     * 0: true
     * 1: false
     * }
     */
    completed: Object;

    setActiveStep?: (args: number) => void;
    orientation?: 'vertical' | 'horizontal';
    children?: React.ReactNode;
}

interface IStepperItem {
    onClick?: () => any;
    // defaults to the last index step item not showing the divider;
    showDivider?: boolean;

    // procs active state
    isActive?: boolean;

    // procs completed state
    isCompleted?: boolean;

    size?: 'sm' | 'md';
    children?: any;
    orientation?: IStepper['orientation'];

    // size of the step divider
    spacing?: number;
}

interface IStepDivider {
    buttonSize?: number;
}

export type StepperProps = IStepper & BoxProps;
export type StepperItemProps = IStepperItem & BoxProps;
export type StepperDividerProps = IStepDivider & IStepperItem & BoxProps;
