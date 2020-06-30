import CheckIcon from 'mdi-react/CheckIcon';
import React, { Children, cloneElement, isValidElement } from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { Tab, TabList, Tabs } from '../Tabs';
import { Text } from '../Text';
import useStepperStyle from './styles';
import { StepperDividerProps, StepperItemProps, StepperProps } from './types';

function getSteps() {
    return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

export const Stepper = ({
    steps = getSteps(),
    activeStep,
    setActiveStep,
    completed,
    orientation = 'horizontal',
    children,
    ...props
}: StepperProps) => {
    // const totalSteps = () => {
    //     return steps.length;
    // };

    // const completedSteps = () => {
    //     return Object.keys(completed).length;
    // };

    // const isLastStep = () => {
    //     return activeStep === totalSteps() - 1;
    // };

    // const allStepsCompleted = () => {
    //     return completedSteps() === totalSteps();
    // };

    // const handleNext = () => {
    //     const newActiveStep =
    //         isLastStep() && !allStepsCompleted()
    //             ? // It's the last step, but not all steps have been completed,
    //               // find the first step that has been completed
    //               steps.findIndex((step, i) => !(i in completed))
    //             : activeStep + 1;
    //     setActiveStep(newActiveStep);
    // };

    // const handleBack = () => {
    //     setActiveStep(prevActiveStep => prevActiveStep - 1);
    // };

    const handleStep = step => {
        setActiveStep(step);
    };

    // const handleComplete = () => {
    //     const newCompleted = completed;
    //     newCompleted[activeStep] = true;
    //     setCompleted(newCompleted);
    //     handleNext();
    // };

    // const handleReset = () => {
    //     setActiveStep(0);
    //     setCompleted({});
    // };

    const { root: stepperStyleProps } = useStepperStyle({
        orientation,
    });

    return (
        <Tabs orientation={orientation} {...stepperStyleProps} {...props}>
            <TabList justifyContent="flex-start">
                {Children.map(children, (child, index) => {
                    if (!isValidElement(child)) {
                        return null;
                    }

                    const isLast = index === Children.count(children) - 1;

                    const isCompleted = completed[index];
                    const isActive = activeStep === index;

                    return cloneElement(child, {
                        onClick: () => {
                            if (child.props.onClick) {
                                child.props.onClick();
                            } else {
                                handleStep(index);
                            }
                        },
                        index,
                        showDivider: !isLast,
                        orientation,
                        isCompleted,
                        isActive,
                    });
                })}
            </TabList>
        </Tabs>
    );
};

export const StepDivider = ({ size, buttonSize, orientation, isCompleted, spacing, ...props }: StepperDividerProps) => {
    const { divider: dividerStyleProps } = useStepperStyle({
        size,
        spacing,
        isCompleted,
        buttonSize,
        orientation,
    });

    return <Box as="hr" aria-orientation={orientation} {...dividerStyleProps} {...props} />;
};

const sizeProps = {
    sm: {
        button: 4,
        divider: 2,
    },
    md: {
        button: 6,
        divider: 3,
    },
};

export const StepperItem = React.forwardRef(
    (
        {
            onClick,
            showDivider,
            orientation,
            isCompleted,
            isActive,
            spacing = 8,
            children,
            size = 'sm',
            ...rest
        }: StepperItemProps,
        ref
    ) => {
        const { button, divider } = sizeProps[size];

        const { item: itemStyleProps, outer: outerStyleProps } = useStepperStyle({
            size,
            isCompleted,
            orientation,
            isActive,
            buttonSize: button,
        });

        return (
            <>
                <Tab onClick={onClick} {...outerStyleProps} ref={ref} {...rest}>
                    <Button
                        iconOnly
                        {...itemStyleProps}
                        // borderColor={!isCompleted ? 'border' : 'secondary'}
                    >
                        {isCompleted && !isActive && (
                            <Box color="titleText">
                                <CheckIcon size={12} />
                            </Box>
                        )}
                        {isActive && <Box w="4px" h="4px" bg="primary.500" rounded="full" zIndex="base" />}
                    </Button>
                    <Text
                        ml={orientation === 'vertical' && 'spacing'}
                        mt={orientation === 'horizontal' && 'spacing-sm'}
                        state={isActive ? 'emphasis' : 'faint'}
                    >
                        {children}
                    </Text>
                    {showDivider && orientation === 'horizontal' && (
                        <StepDivider
                            size={divider}
                            buttonSize={button}
                            orientation={orientation}
                            isCompleted={isCompleted}
                            spacing={spacing}
                        />
                    )}
                </Tab>
                {showDivider && orientation === 'vertical' && (
                    <StepDivider
                        size={divider}
                        buttonSize={button}
                        orientation={orientation}
                        isCompleted={isCompleted}
                        spacing={spacing}
                    />
                )}
            </>
        );
    }
);
