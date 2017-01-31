import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import CvForm from '../components/CvForm';

const validate = values => {
  const errors = {};
  const requiredFields = [ 'firstname', 'lastname' ];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'This field is required'
    }
  });
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
  mapStateToProps
)(MainCvForm);
