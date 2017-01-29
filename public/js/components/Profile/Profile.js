import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const validate = values => {
  const errors = {};
  const requiredFields = [ 'email' ];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  });
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

let ProfileForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  const submit = values => {
    debugger;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <form className="form" onSubmit={handleSubmit(submit)}>
            <div className="form-group">
              <Field
                component={renderTextField}
                fullWidth={true}
                label="Username"
                name="username"
              />
            </div>
            <div className="form-group">
              <Field
                component={renderTextField}
                fullWidth={true}
                label="First Name"
                name="firstName"
              />
            </div>
            <div className="form-group">
              <Field
                component={renderTextField}
                fullWidth={true}
                label="Last Name"
                name="lastName"
              />
            </div>
            <div className="form-group">
              <Field
                component={renderTextField}
                fullWidth={true}
                label="Email"
                name="email"
                type="email"
              />
            </div>
            <div className="form-group">
              <RaisedButton
                disabled={pristine || submitting}
                label="Submit"
                primary={true}
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

ProfileForm = reduxForm({
  form: 'ProfileForm',
  validate
})(ProfileForm);

export default connect(
  state => {
    let data = {};
    if (state.auth.user &&
        Object.keys(state.auth.user).length) {
      Object.assign(
        data, {
        username: state.auth.user.username,
        firstname: state.auth.user.firstname,
        lastname: state.auth.user.lastname,
        email: state.auth.user.email
      });
    }
    return {
      initialValues: data
    };
  }
)(ProfileForm);
