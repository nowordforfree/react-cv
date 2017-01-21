import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = {
      email: '',
      password: ''
    };
    this.register = {
      email: '',
      password: '',
      confirm_password: ''
    };
    this.state = {
      activeTab: 'login',
      error: {
        login: null,
        register: null
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
  validateAndLogin(e) {
    e.preventDefault();
    let noLoginError = Object.assign({},
      this.state,
      { error: { login: null } }
    );
    this.setState(noLoginError);
    fetch(`${API_URL}/auth/login`, {
      method: 'post',
      body: new FormData(e.target)
    })
    .then(res => { return res.json(); })
    .then(res => {
      if (res.data) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
      } else if (res.error) {
        let newState = Object.assign(
          {},
          this.state,
          { error: { login: res.error } }
        );
        this.setState(newState);
      }
    })
    .catch((err) => {
      debugger;
    });
  }
  validateAndRegister(e) {
    e.preventDefault();
    if (this.register.password.value !==
        this.register.confirm_password.value) {
      alert('Password and confirm password are not match');
      return;
    }
    fetch(`${API_URL}/user`, {
      method: 'post',
      body: new FormData(e.target)
    })
    .then(res => { return res.json(); })
    .then(res => {
      debugger;
    })
    .catch((err) => {
      debugger;
    });
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
                    <label htmlFor="email" className="col-xs-3 control-label">
                      Email
                    </label>
                    <div className="col-xs-9">
                      <input type="email" id="email" name="email" className="form-control"
                            ref={(input) => { this.login.email = input; }} required/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="col-xs-3 control-label">
                      Password
                    </label>
                    <div className="col-xs-9">
                      <input type="password" id="password" name="password"
                            className="form-control" minLength="6"
                            ref={(input) => { this.login.password = input; }} required/>
                    </div>
                  </div>
                  <div className={"form-group alert alert-danger" +
                                  (this.state.error.login !== null ? "" : " hidden")
                                 }>
                    <div className="col-xs-9 col-xs-offset-3">
                      {this.state.error.login}
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
                    <label htmlFor="email" className="col-xs-3 control-label">
                      Email
                    </label>
                    <div className="col-xs-9">
                      <input type="email" id="email" name="email" className="form-control"
                              ref={(input) => { this.register.email = input; }} required/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="col-xs-3 control-label">
                      Password
                    </label>
                    <div className="col-xs-9">
                      <input type="password" id="password" name="password"
                              className="form-control" minLength="6"
                              ref={(input) => { this.register.password = input; }} required/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirm_password" className="col-xs-3 control-label">
                      Confirm password
                    </label>
                    <div className="col-xs-9">
                      <input type="password" id="confirm_password" name="confirm_password"
                              className="form-control" minLength="6"
                              ref={(input) => { this.register.confirm_password = input; }}
                              required/>
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