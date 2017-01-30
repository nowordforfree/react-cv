import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { login } from '../actions';
import Login from '../components/Login';

const validate = values => {
  const errors = {};
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const requiredFields = [ 'email', 'password' ];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  });
  if (values.email && !emailRegex.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (values.password && values.password.length < 6) {
    errors.password = 'Password should contain at least 6 characters'
  }
  return errors
}

let LoginForm = reduxForm({
  form: 'LoginForm',
  validate
})(Login);

const mapStateToProps = (state) => ({
  authError: state.auth.error
});

export default connect(
  mapStateToProps,
  { login: login }
)(LoginForm);