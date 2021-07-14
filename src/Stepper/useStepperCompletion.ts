import { useCallback, useEffect, useState } from 'react';
import { useCanvasContext } from '../Canvas';

// returns the completed object to be passed into a <Stepper />
// and returns onFormChange to use in the <Form> onChange event (should throttle)

interface useStepperCompletionProps {
    activeStep: number;

    // array of initial form field names which have values
    initial: Array<string>;

    // list of all stepper steps
    steps: Array<any>;

    // if stepper is within a canvas, the canvas must be updated to pass new set of renderProps that holds the new completed state
    canvasName?: string;

    // Array of form item keys that you want to contribute to completion state of the stepper
    // name of form field, as well as the stepper route which that field exists on
    formCompletionFields: Array<{ name: string; route: string }>;
}

export const useStepperCompletion = ({
    activeStep,
    initial = [],
    canvasName,
    steps,
    formCompletionFields,
}: useStepperCompletionProps) => {
    const { updatePanel } = useCanvasContext();

    // tracks step completion - can consist on multiple fields needed to be filled to be marked complete
    const [completed, setCompleted] = useState({});

    // tracks individual field completion
    const [fieldsWithValues, setFieldsWithValues] = useState(initial);

    const onFormChange = useCallback(
        (lastFieldUpdated) => {
            // when a form item changes, check if that key already has a value in the fieldsWithValues array
            // if that key doesn't already have a value, add it to the key
            // if the key has a value but the field content is deleted, remove the list - else do nothing.
            if (lastFieldUpdated) {
                setFieldsWithValues((prev) => {
                    const updatedArray = [...prev];

                    const addArrayItem = (key) => {
                        if (key) {
                            const index = prev.indexOf(key.name);
                            const isValidValue = key.value || typeof key.value === 'boolean';

                            if (isValidValue && index === -1) {
                                updatedArray.push(key.name);
                            } else if (!isValidValue && index > -1) {
                                // remove
                                updatedArray.splice(index, 1);
                            }
                        }
                    };

                    if (Array.isArray(lastFieldUpdated)) {
                        lastFieldUpdated.forEach((k) => {
                            addArrayItem(k);
                        });
                    } else {
                        addArrayItem(lastFieldUpdated);
                    }

                    validate(updatedArray);

                    return updatedArray;
                });
            }
        },
        [fieldsWithValues]
    );

    const validate = (toValidate) => {
        // perform for all steps to support accurate updates
        steps.forEach((s, sIndex) => {
            // if all items in this step have values, mark step as completed
            const routeItems = formCompletionFields.filter((item) => item.route === s.id);
            let allComplete = true;
            routeItems.forEach((item) => {
                if (toValidate.indexOf(item.name) === -1) {
                    allComplete = false;
                }
            });
            handleComplete(allComplete, sIndex);
        });
    };

    const handleComplete = useCallback((isComplete = true, i = activeStep) => {
        const newCompleted = completed;
        if (isComplete) {
            newCompleted[i] = isComplete;
        } else {
            delete newCompleted[i];
        }

        setCompleted(newCompleted);
    }, []);

    useEffect(() => {
        validate(fieldsWithValues);
    }, [activeStep]);

    useEffect(() => {
        // update the stepper within a canvas
        // can skip by not passing a canvasName
        if (canvasName) {
            updatePanel(canvasName, {
                renderProps: {
                    completed,
                },
            });
        }
    }, [completed]);

    return {
        completed,
        onFormChange,
    };
};
