import { Field } from "redux-form";
import classes from "./Form.module.css";

const PizzaOptions = ({ forwardedNumberRef, forwardedDiameterRef }) => {

    const createInput = render => ({ input, meta, label, type, ...rest }) => (
        <div className={classes.field}>
            <label>
                {label}
            </label>
            {render(input, label, rest, type)}
        </div>
    )

    const numberInput = createInput((input, label) =>
        <input
            required
            min="1"
            className={classes.inputField}
            type="number"
            {...input} />
    );

    const floatInput = createInput((input, label, step) =>
        <input
            required
            min="1"
            className={classes.inputField}
            type="number"
            step={0.1}
            {...input} />
    );

    return (
        <>
            <Field
                name="no_of_slices"
                component={numberInput}
                label="# of slices"
                ref={forwardedNumberRef}
                required>
            </Field>
            <Field
                name="diameter"
                component={floatInput}
                label="Diameter"
                step="0.1"
                ref={forwardedDiameterRef}
                required>
            </Field>
        </>
    )
}

export default PizzaOptions;