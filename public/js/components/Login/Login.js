import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
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
  componentDidMount() {
    $.material.init();
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
              <form className="form-horizontal" onSubmit={this.validateAndLogin.bind(this)}>
                <fieldset>
                  <div className="form-group">
                    <label htmlFor="login_email" className="col-xs-3 control-label">
                      Email
                    </label>
                    <div className="col-xs-9">
                      <input type="email" id="login_email" name="email" className="form-control"
                             onChange={ this.handleEmail.bind(this) } required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="login_password" className="col-xs-3 control-label">
                      Password
                    </label>
                    <div className="col-xs-9">
                      <input type="password" id="login_password" name="password"
                            className="form-control" minLength="6"
                            onChange={ this.handlePassword.bind(this) } required />
                    </div>
                  </div>
                  <div className={"form-group alert alert-danger" +
                                  ((this.state.error.login ||
                                    this.props.error) ? "" : " hidden")
                                 }>
                    <div className="col-xs-9 col-xs-offset-3">
                      <b>{this.state.error.login || this.props.error}</b>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-xs-offset-3 col-xs-9">
                      <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                  </div>
                </fieldset>
              </form>
            </Tab>
            <Tab title="Register as new user" label="Register" value="register">
              <form className="form-horizontal" onSubmit={this.validateAndRegister.bind(this)}>
                <fieldset>
                  <div className="form-group">
                    <label htmlFor="register_email" className="col-xs-3 control-label">
                      Email
                    </label>
                    <div className="col-xs-9">
                      <input type="email" id="register_email" name="email" className="form-control"
                             onChange={ this.handleEmail.bind(this) } required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="register_password" className="col-xs-3 control-label">
                      Password
                    </label>
                    <div className="col-xs-9">
                      <input type="password" id="register_password" name="password"
                              className="form-control" minLength="6"
                              onChange={ this.handlePassword.bind(this) } required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirm_password" className="col-xs-3 control-label">
                      Confirm password
                    </label>
                    <div className="col-xs-9">
                      <input type="password" id="confirm_password" name="confirm_password"
                              className="form-control" minLength="6"
                              onChange={ this.handleConfirmPassword.bind(this) }
                              required />
                    </div>
                  </div>
                  <div className={"form-group alert alert-danger" +
                                  ((this.state.error.register ||
                                    this.props.error) ? "" : " hidden")
                                 }>
                    <div className="col-xs-9 col-xs-offset-3">
                      <b>{this.state.error.register || this.props.error}</b>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-xs-offset-3 col-xs-9">
                      <button type="submit" className="btn btn-primary">Register</button>
                    </div>
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