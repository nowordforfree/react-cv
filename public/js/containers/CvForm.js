import { connect } from 'react-redux';
import { reduxForm, initialize, change, stopSubmit } from 'redux-form';
import { createCv, updateCv } from '../actions';
import CvForm from '../components/CvForm';

const validate = values => {
  const errors = {};
  const requiredFields = [ 'firstname', 'lastname' ];
  if (values.cv) {
    errors.cv = {};
    requiredFields.forEach(field => {
      if (!values.cv[ field ]) {
        errors.cv[ field ] = 'This field is required'
      }
    });
    if (values.cv.experiences && values.cv.experiences.length) {
      const requiredExperienceFields = [ 'since', 'till', 'role', 'company' ];
      if (!errors.cv.experiences) {
        errors.cv.experiences = [];
      }
      values.cv.experiences.forEach((obj, i) => {
        requiredExperienceFields.forEach(field => {
          if (!obj[ field ]) {
            if (!errors.cv.experiences[i]) {
              errors.cv.experiences[i] = {};
            }
            errors.cv.experiences[i] = Object.assign(
              errors.cv.experiences[i],
              { [field]: 'This field is required' }
            );
          }
        });
        if (obj.since && obj.till &&
           (obj.since > obj.till)) {
          errors.cv.experiences[i] = Object.assign(
            errors.cv.experiences[i],
            { since: '"Since" should be less then "Till"' }
          );
        }
      });
    }
    if (values.cv.projects && values.cv.projects.length) {
      const requiredProjectFields = [ 'title', 'description' ];
      if (!errors.cv.projects) {
        errors.cv.projects = [];
      }
      values.cv.projects.forEach((obj, i) => {
        requiredProjectFields.forEach(field => {
          if (!obj[ field ]) {
            if (!errors.cv.projects[i]) {
              errors.cv.projects[i] = {};
            }
            errors.cv.projects[i] = Object.assign(
              errors.cv.projects[i],
              { [field]: 'This field is required' }
            );
          }
        });
      });
    }
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
  { initialize, change, notSubmit: stopSubmit, createCv, updateCv }
)(MainCvForm);
