import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { login, register } from '../../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      activeTab: 'login',
      error: {
        login: null,
        register: null
      },
      login: {
        email: null,
        password: null
      },
      register: {
        email: null,
        password: null,
        confirm_password: null
      }
    };
  }
  handleSelect(key) {
    this.setState({
      activeTab: key
    });
  }
  handleEmail(e) {
    let tab = this.state.activeTab;
    this.state[tab].email = e.target.value;
  }
  handlePassword(e) {
    let tab = this.state.activeTab;
    this.state[tab].password = e.target.value;
  }
  handleConfirmPassword(e) {
    this.state.register.confirm_password = e.target.value;
  }
  validateAndLogin(e) {
    e.preventDefault();
    // some validation goes here
    this.props.login({
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.login)
    });
  }
  validateAndRegister(e) {
    e.preventDefault();
    if (this.state.register.password !==
        this.state.register.confirm_password) {
      this.setState({
        error: {
          register: 'Password and confirm password are not match'
        }
      });
    } else {
      this.setState({
        error: {
          register: null
        }
      });
      this.props.register({
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.register.email,
          password: this.state.register.password
        })
      });
    }
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-offset-2 col-md-8">
          <Tabs value={this.state.activeTab} onChange={this.handleSelect.bind(this)}>
            <Tab title="Sign In as registered user" label="Login" value="login">
              <form className="form col-md-6 col-md-offset-3" onSubmit={this.validateAndLogin.bind(this)}>
                <fieldset>
                  <div className="form-group">
                    <TextField
                      type="email"
                      name="email"
                      floatingLabelText="Email"
                      fullWidth={true}
                      onChange={ this.handleEmail.bind(this) }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      type="password"
                      name="password"
                      floatingLabelText="Password"
                      fullWidth={true}
                      minLength={6}
                      onChange={ this.handlePassword.bind(this) }
                      required
                    />
                  </div>
                  <div className={"form-group" +
                                  ((this.state.error.login ||
                                    this.props.error) ? "" : " hidden")
                                 }>
                    <div className="alert alert-danger text-center">
                      <b>{this.state.error.login || this.props.error}</b>
                    </div>
                  </div>
                  <div className="form-group">
                    <RaisedButton
                      label="Login"
                      primary={true}
                      type="submit"
                    />
                  </div>
                </fieldset>
              </form>
            </Tab>
            <Tab title="Register as new user" label="Register" value="register">
              <form className="form col-md-6 col-md-offset-3" onSubmit={this.validateAndRegister.bind(this)}>
                <fieldset>
                  <div className="form-group">
                    <TextField
                      type="email"
                      name="email"
                      floatingLabelText="Email"
                      fullWidth={true}
                      onChange={ this.handleEmail.bind(this) }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      type="password"
                      name="password"
                      floatingLabelText="Password"
                      fullWidth={true}
                      minLength={6}
                      onChange={ this.handlePassword.bind(this) }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      type="password"
                      name="confirm_password"
                      floatingLabelText="Confirm Password"
                      fullWidth={true}
                      minLength={6}
                      onChange={ this.handleConfirmPassword.bind(this) }
                      required
                    />
                  </div>
                  <div className={"form-group" +
                                  ((this.state.error.register ||
                                    this.props.error) ? "" : " hidden")
                                 }>
                    <div className="alert alert-danger text-center">
                      <b>{this.state.error.register || this.props.error}</b>
                    </div>
                  </div>
                  <div className="form-group">
                    <RaisedButton
                      label="Register"
                      primary={true}
                      type="submit"
                    />
                  </div>
                </fieldset>
              </form>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  error: state.auth.error
});

export default connect(
  mapStateToProps,
  { login, register }
)(Login);