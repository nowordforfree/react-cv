import React from 'react';
import { Field } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

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

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: ''
    };
  }
  submit(values) {
    let { userId, ...data } = values;
    this
      .props
      .update(userId, data)
      .then(() => {
        this.setState({
          open: true,
          message: 'Changes saved successfully'
        });
      })
      .catch(() => {
        this.setState({
          open: true,
          message: 'Error occured while trying to save changes'
        });
      });
  }
  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <form className="form" onSubmit={handleSubmit(this.submit.bind(this))}>
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
                  name="firstname"
                />
              </div>
              <div className="form-group">
                <Field
                  component={renderTextField}
                  fullWidth={true}
                  label="Last Name"
                  name="lastname"
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
                  label="Update"
                  primary={true}
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
        <Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={2000}
        />
      </div>
    );
  }
};
