import React from 'react';
import { Field } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import { renderTextField } from '../../helpers';

export default (props) => {
  const { handleSubmit, pristine, submitting } = props;
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
            component={renderTextField}
          />
        </div>
        <div className="form-group">
          <Field
            name="password"
            type="password"
            label="Password"
            fullWidth={true}
            component={renderTextField}
          />
        </div>
        <div className="form-group">
          <Field
            name="confirm_password"
            type="password"
            label="Confirm Password"
            fullWidth={true}
            component={renderTextField}
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
};
