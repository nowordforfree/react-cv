import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';

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
    {...custom}
  />
)

const ProfileForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <Field name="username" component={renderTextField} label="Username"/>
      </div>
      <div className="form-group">
        <Field name="firstName" component={renderTextField} label="First Name"/>
      </div>
      <div className="form-group">
        <Field name="lastName" component={renderTextField} label="Last Name"/>
      </div>
      <div className="form-group">
        <Field name="email" component={renderTextField} label="Email"/>
      </div>
      <div className="form-group">
        <button className="btn btn-primary" type="submit" disabled={pristine || submitting}>Submit</button>
      </div>
    </form>
  )
}

let Form = reduxForm({
  form: 'ProfileForm',
  // fields: [ 'username', 'firstName', 'lastName', 'email' ],
  validate
})(ProfileForm);

export default connect(
  state => ({
    initialValues: { email: 'asdasd' }
  })
)(Form);
