import { Field } from "redux-form";
import classes from "./Form.module.css";

const SoupOptions = ({ forwardedSpicinessRef }) => {

    const createInput = render => ({ input, meta, label, type, ...rest }) => (
        <div className={classes.field}>
            <label>
                {label}
            </label>
            {render(input, label, rest, type)}
        </div>
    )

    const numberInput = createInput((input, label) =>
        <>
            <input
                required
                className={classes.inputField}
                type="range"
                min="1"
                max="10"
                {...input} />
        </>
    );

    return (
        <>
            <Field
                name="spiciness_scale"
                component={numberInput}
                label="Spiciness scale"
                ref={forwardedSpicinessRef}
                required>
            </Field>
            <p className={classes.span}>Move the scale to choose the spiciness!</p>
        </>
    )
}

export default SoupOptions;