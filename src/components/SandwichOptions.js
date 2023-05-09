import { Field } from "redux-form";
import classes from "./Form.module.css";

const SandwichOptions = ({ forwardedSlicesRef }) => {

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

    return (
        <>
            <Field
                name="slices_of_bread"
                component={numberInput}
                label="Number of slices"
                ref={forwardedSlicesRef}
                required>
            </Field>
        </>
    )
}

export default SandwichOptions;