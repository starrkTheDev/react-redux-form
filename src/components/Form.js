import { reduxForm, Field } from 'redux-form';
import { options } from '../data/options';
import { useState, useRef } from 'react';
import PizzaOptions from './PizzaOptions';
import SoupOptions from './SoupOptions';
import SandwichOptions from './SandwichOptions';
import classes from "./Form.module.css";
import background from "../img/bg.jpg";

let Form = ({ handleSubmit }) => {


    const nameInputRef = useRef();
    const timeInputRef = useRef();
    const typeInputRef = useRef();
    const numberInputRef = useRef();
    const diameterInputRef = useRef();
    const slicesInputRef = useRef();
    const spicinessInputRef = useRef();


    // function responsible of fetching the data from form
    async function onSubmit() {
        const enteredName = nameInputRef.current.value;
        const enteredTime = timeInputRef.current.value;
        const enteredType = typeInputRef.current.value;
        const enteredDishData = {
            name: enteredName,
            preparation_time: enteredTime,
            type: enteredType,
        };

        if (showPizzaType) {
            const enteredNumber = numberInputRef.current.value;
            const enteredDiameter = diameterInputRef.current.value;
            enteredDishData.no_of_slices = parseInt(enteredNumber);
            enteredDishData.diameter = parseInt(enteredDiameter);
        } else if (showSandwichType) {
            const enteredSlices = slicesInputRef.current.value;
            enteredDishData.slices_of_bread = parseInt(enteredSlices);
        } else if (showSoupType) {
            const enteredSpiciness = spicinessInputRef.current.value;
            enteredDishData.spiciness_scale = parseInt(enteredSpiciness);
        }

        const response = await fetch('https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/', {
            method: 'POST',
            body: JSON.stringify(enteredDishData),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json();
        console.log(data);
        window.alert(`You submitted:\n\n${JSON.stringify(enteredDishData, null, 2)}`)
    }

    const createInput = render => ({ input, meta, label, type, ...rest }) => (
        <div className={classes.field}>
            <label >
                {label}
            </label>
            {render(input, label, rest, type)}
        </div>
    )

    const textInput = createInput((input, label) =>
        <input className={classes.inputField}
            {...input}
            placeholder={label}
            autoFocus
            min="3"
            required />
    );

    const timeInput = createInput((input, label, step) =>
        <input
            className={classes.inputField}
            type="time"
            step="1"
            {...input}
            required />
    )

    const selectInput = createInput((input, label, { children }) =>
        <select
            required
            className={classes.inputField}
            {...input}>
            {children}
        </select>
    );

    const [error, setError] = useState(false);
    const [showPizzaType, setShowPizzaType] = useState(false);
    const [showSoupType, setShowSoupType] = useState(false);
    const [showSandwichType, setShowSandwichType] = useState(false);


    // function responsible of rendering the conditional inputs
    const typeChanger = event => {
        const selectedType = event.target.value;
        if (selectedType === "pizza") {
            setShowPizzaType(true);
            setShowSoupType(false);
            setShowSandwichType(false);
        } else if (selectedType === "soup") {
            setShowPizzaType(false);
            setShowSoupType(true);
            setShowSandwichType(false);
        } else if (selectedType === "sandwich") {
            setShowPizzaType(false);
            setShowSoupType(false);
            setShowSandwichType(true);
        } else {
            setShowPizzaType(false);
            setShowSoupType(false);
            setShowSandwichType(false);
        }
    }

    const nameValidate = event => {
        const nameValue = event.target.value;
        if (nameValue.length < 3) {
            setError(true)
        }
        if (nameValue.length >= 3) {
            setError(false)
        }
    }

    return (
        <body style={{ backgroundImage: `url(${background})` }} >
            <form
                className={classes.midform}
                onSubmit={handleSubmit(onSubmit)} >
                <Field
                    name="name"
                    label="Name"
                    component={textInput}
                    ref={nameInputRef}
                    onChange={nameValidate}
                />
                {error && <p className={classes.span}>At least 3 characters</p>}
                <Field
                    name="preparation_time"
                    label="Preparation time"
                    component={timeInput}
                    ref={timeInputRef}
                />
                <Field
                    name="type"
                    component={selectInput}
                    label="Type"
                    ref={typeInputRef}
                    onChange={typeChanger}>
                    {options.map(option =>
                        <option
                            key={option}
                            value={option}>
                            {option}
                        </option>)}
                </Field>
                {showPizzaType &&
                    <PizzaOptions
                        forwardedNumberRef={numberInputRef}
                        forwardedDiameterRef={diameterInputRef} />}
                {showSoupType && <SoupOptions
                    forwardedSpicinessRef={spicinessInputRef} />}
                {showSandwichType && <SandwichOptions
                    forwardedSlicesRef={slicesInputRef} />}
                <button className={classes.submitButton} type='submit'>Submit</button>
            </form>
        </body>
    )
}

Form = reduxForm({
    form: 'form',
})(Form)

export default Form;
