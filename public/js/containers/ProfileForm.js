import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { updateProfile } from '../actions';
import Profile from '../components/Profile';

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

let ProfileForm = reduxForm({
  form: 'ProfileForm',
  validate
})(Profile);

const mapStateToProps = state => {
  let data = {};
  if (state.auth.user &&
      Object.keys(state.auth.user).length) {
    Object.assign(
      data, {
      userId: state.auth.user.id,
      username: state.auth.user.username,
      firstname: state.auth.user.firstname,
      lastname: state.auth.user.lastname,
      email: state.auth.user.email
    });
  }
  return {
    initialValues: data
  };
};

export default connect(
  mapStateToProps,
  { update: updateProfile }
)(ProfileForm);