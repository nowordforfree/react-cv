import { connect } from 'react-redux';
import { reduxForm, initialize, change, stopSubmit } from 'redux-form';
import CvForm from '../components/CvForm';

const validate = values => {
  const errors = {};
  const requiredFields = [ 'firstname', 'lastname' ];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'This field is required'
    }
  });
  if (values.since && values.till &&
     (values.since > values.till)) {
    errors.since = '"Since" should be less then "Till"'
  }
  return errors
}

let MainCvForm = reduxForm({
  form: 'CvForm',
  validate
})(CvForm);

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { initialize, change, stopSubmit }
)(MainCvForm);
