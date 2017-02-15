import React from 'react';
import { Field } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import renderTextField from '../../helpers';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {
      open: false,
      message: ''
    };
  }
  submit(values) {
    const { userId, ...data } = values;
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
            <form className="form" onSubmit={handleSubmit(this.submit)}>
              <div className="form-group">
                <Field
                  component={renderTextField}
                  fullWidth
                  label="Username"
                  name="username"
                />
              </div>
              <div className="form-group">
                <Field
                  component={renderTextField}
                  fullWidth
                  label="First Name"
                  name="firstname"
                />
              </div>
              <div className="form-group">
                <Field
                  component={renderTextField}
                  fullWidth
                  label="Last Name"
                  name="lastname"
                />
              </div>
              <div className="form-group">
                <Field
                  component={renderTextField}
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                />
              </div>
              <div className="form-group">
                <RaisedButton
                  disabled={pristine || submitting}
                  label="Update"
                  primary
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
}

Profile.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  pristine: React.PropTypes.bool.isRequired,
  submitting: React.PropTypes.bool.isRequired,
  update: React.PropTypes.func.isRequired
};

export default Profile;
