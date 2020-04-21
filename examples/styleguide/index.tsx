import FilterIcon from 'mdi-react/FilterIcon';
import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
    Box,
    Button,
    ButtonGroup,
    Checkbox,
    CheckboxGroup,
    Heading,
    Input,
    InputGroup,
    NumberInput,
    Radio,
    RadioGroup,
    Select,
    Switch,
    Text,
    ToggleGroup,
} from '../../src';
import { CanvasContext } from '../../src/Canvas';
import { CanvasMenu } from '../../src/CanvasMenu';
import { Form } from '../../src/Form';
import { Page, PageContent } from '../../src/Page';
import { ToggleButton } from '../../src/ToggleGroup';
import { AppShell } from './components/AppShell';

const notificationItems = {
    header: [
        {
            label: 'Filter Header',
            icon: FilterIcon,
            href: null,
        },
    ],
};

function StyleGuide(props) {
    const { panels, togglePanel, setPanel } = useContext(CanvasContext);
    const [formValue, setFormValue] = useState(null);

    useEffect(() => {
        setPanel('filter', () => ({
            name: 'filter',
            position: 'left',
            type: 'inline',
            isMinifiable: false,
            isVisible: false,
            isStackable: true,
            render: componentProps => (
                <CanvasMenu items={notificationItems}>
                    {/* from Form/examples.tsx */}
                    <Form
                        onSubmit={(e, { getFormValue }) => {
                            e.preventDefault();
                            setFormValue(getFormValue());
                        }}
                        onChange={p => console.log(p)}
                        initialValue={{
                            cone: 'waffle',
                            first_name: 'testname',
                            gender: 'female',
                            age: 20,
                            chocolate: false,
                            caramel: true,
                            flavor: 'mango',
                            lactose_intolerant: true,
                        }}
                    >
                        {/* <Input> should be wrapped by an <InputGroup> for form controls, label, and support for InputLeftElement, etc (see InputGroup) */}
                        <InputGroup label="First Name" name="first_name">
                            <Input />
                        </InputGroup>

                        {/* Same as for <Input> */}
                        <InputGroup label="Age" name="age">
                            <NumberInput max={100} min={0} step={1} />
                        </InputGroup>

                        {/* Since radio groups should have just one value selected, "name" is placed as a <RadioGroup> prop */}
                        <RadioGroup label="Gender" name="gender">
                            <Radio value="male">Male</Radio>
                            <Radio value="female">Female</Radio>
                        </RadioGroup>

                        <ToggleGroup label="Type of cone" name="cone">
                            <ToggleButton value="regular">Regular</ToggleButton>
                            <ToggleButton value="waffle">Waffle</ToggleButton>
                            <ToggleButton value="dish">Dish</ToggleButton>
                        </ToggleGroup>

                        {/* <Select> should be wrapped in an <InputGroup> component to apply form controls and label */}
                        <InputGroup label="Ice cream flavor" name="flavor">
                            <Select
                                // isMulti
                                options={[
                                    { value: 'chocolate', label: 'Chocolate' },
                                    { value: 'vanilla', label: 'Vanilla' },
                                    {
                                        label: 'Fruits',
                                        options: [
                                            {
                                                label: 'Strawberry',
                                                value: 'strawberry',
                                            },
                                            {
                                                label: 'Mango',
                                                value: 'mango',
                                            },
                                        ],
                                    },
                                ]}
                            />
                        </InputGroup>

                        {/* <CheckboxGroup> wrapped for form control and label. "name" should be passed to individual checkboxes, as multiple can be selected. */}
                        <CheckboxGroup name="toppings" label="Toppings">
                            <Checkbox name="chocolate">Chocolate</Checkbox>
                            <Checkbox name="caramel">Caramel</Checkbox>
                        </CheckboxGroup>

                        {/* <Switch> components can just be wrapped in a <Stack> component which will apply consistent spacing as other InputGroups */}
                        <InputGroup name="lactose_intolerant">
                            <Switch>I'm lactose intolerant</Switch>
                        </InputGroup>

                        <Button type="submit">Filter</Button>
                    </Form>
                </CanvasMenu>
            ),
            bg: 'navBg',
        }));
    }, []);

    return (
        <Page>
            <PageContent>
                <ButtonGroup>
                    <Button onClick={() => togglePanel('menu')}>Toggle Navigation Menu Canvas</Button>
                    <Button onClick={() => togglePanel('filter')}>Toggle Filter Canvas</Button>
                </ButtonGroup>

                {formValue && (
                    <Box>
                        <Heading kind="h6">Filters applied</Heading>
                        {Object.keys(formValue).map(key => {
                            return (
                                <Text>
                                    {key} : {formValue[key].toString()}
                                </Text>
                            );
                        })}
                    </Box>
                )}
            </PageContent>
        </Page>
    );
}

ReactDOM.render(
    <AppShell>
        <StyleGuide />
    </AppShell>,
    document.getElementById('root')
);
