import React from 'react';
import { Field } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import renderTextField from '../../helpers';

const Login = (props) => {
  const { handleSubmit, pristine, submitting } = props;
  const submit = (values) => {
    const { email, password } = values;
    props.login({ email, password });
  };
  return (
    <form
      className="form col-md-6 col-md-offset-3"
      onSubmit={handleSubmit(submit)}
    >
      <fieldset>
        <div className="form-group">
          <Field
            name="email"
            type="email"
            label="Email"
            fullWidth
            component={renderTextField}
          />
        </div>
        <div className="form-group">
          <Field
            name="password"
            type="password"
            label="Password"
            fullWidth
            component={renderTextField}
          />
        </div>
        <div
          className={`form-group ${props.authError ? '' : 'hidden'}`}
        >
          <div className="alert alert-danger text-center">
            <b>{props.authError}</b>
          </div>
        </div>
        <div className="form-group">
          <RaisedButton
            disabled={pristine || submitting}
            label="Login"
            primary
            type="submit"
          />
        </div>
      </fieldset>
    </form>
  );
};

Login.defaultProps = {
  authError: ''
};

Login.propTypes = {
  authError: React.PropTypes.string,
  handleSubmit: React.PropTypes.func.isRequired,
  login: React.PropTypes.func.isRequired,
  pristine: React.PropTypes.bool.isRequired,
  submitting: React.PropTypes.bool.isRequired
};

export default Login;
