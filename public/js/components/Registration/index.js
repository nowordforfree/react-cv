import React from 'react';
import { Field } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const renderField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

export default (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  const submit = values => {
    let { email, password } = values;
    props.register({ email, password });
  }
  return (
    <form className="form col-md-6 col-md-offset-3" onSubmit={handleSubmit(submit)}>
      <fieldset>
        <div className="form-group">
          <Field
            name="email"
            type="email"
            label="Email"
            fullWidth={true}
            component={renderField}
          />
        </div>
        <div className="form-group">
          <Field
            name="password"
            type="password"
            label="Password"
            fullWidth={true}
            component={renderField}
          />
        </div>
        <div className="form-group">
          <Field
            name="confirm_password"
            type="password"
            label="Confirm Password"
            fullWidth={true}
            component={renderField}
          />
        </div>
        <div className={"form-group" +
                        (props.authError ? "" : " hidden")
                        }>
          <div className="alert alert-danger text-center">
            <b>{props.authError}</b>
          </div>
        </div>
        <div className="form-group">
          <RaisedButton
            disabled={pristine || submitting}
            label="Register"
            primary={true}
            type="submit"
          />
        </div>
      </fieldset>
    </form>
  );
}