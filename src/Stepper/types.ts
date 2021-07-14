import { BoxProps } from '../Box/types';

type IStepper = {
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
};

type IStepperItem = {
    onClick?: () => any;
    // defaults to the last index step item not showing the divider;
    showDivider?: boolean;

    // procs active state
    isActive?: boolean;

    // procs completed state
    isCompleted?: boolean;

    size?: 'sm' | 'md';
    children?: string | Function;
    orientation?: IStepper['orientation'];

    customIcon?: any;

    // size of the step divider
    spacing?: number;
};

type IStepDivider = {
    buttonSize?: number;
};

export type StepperProps = IStepper & BoxProps;
export type StepperItemProps = IStepperItem & BoxProps;
export type StepperDividerProps = IStepDivider & IStepperItem & BoxProps;
