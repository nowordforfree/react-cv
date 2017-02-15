import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { register } from '../actions';
import Registration from '../components/Registration';

const validate = (values) => {
  const errors = {};
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const requiredFields = ['email', 'password', 'confirm_password'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (values.email && !emailRegex.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (values.password && values.password.length < 6) {
    errors.password = 'Password should contain at least 6 characters';
  }
  if (values.confirm_password && values.confirm_password.length < 6) {
    errors.password =
    'Password confirmation should contain at least 6 characters';
  }
  if (values.password && values.confirm_password &&
      !errors.password && !errors.confirm_password &&
      values.password !== values.confirm_password) {
    errors.password = 'Password and confirm password are not match';
    errors.confirm_password = 'Password and confirm password are not match';
  }
  return errors;
};

const RegistrationForm = reduxForm({
  form: 'RegistrationForm',
  validate
})(Registration);

const mapStateToProps = state => ({
  authError: state.auth.error
});

export default connect(
  mapStateToProps,
  { register }
)(RegistrationForm);
