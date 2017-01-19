import React from 'react';
import cookie from 'react-cookie';

const API_URL = 'http://localhost:8090/api';

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
  }
  validateAndLogin(e) {
    e.preventDefault();
    fetch(`${API_URL}/auth/login`, {
      method: 'post',
      body: new FormData(e.target)
    })
    .then(res => { return res.json(); })
    .then(res => {
      let user = cookie.load('cvs-session');
      debugger;
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
      <div className="col-md-offset-2 col-md-8">
        <ul className="nav nav-tabs nav-justified" role="tablist">
          <li role="presentation" className="active">
            <a href="#login" aria-controls="login" role="tab" data-toggle="tab">
              Have account
            </a>
          </li>
          <li role="presentation">
            <a href="#register" aria-controls="register" role="tab" data-toggle="tab">
              Register
            </a>
          </li>
        </ul>
        <br/>
        <div className="tab-content">
          <div role="tabpanel" className="tab-pane fade in active" id="login">
            <form className="form-horizontal" onSubmit={this.validateAndLogin.bind(this)}>
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
              <div className="form-group">
                <div className="col-xs-offset-3 col-xs-9">
                  <button type="submit" className="btn btn-primary">Login</button>
                </div>
              </div>
            </form>
          </div>
          <div role="tabpanel" className="tab-pane fade" id="register">
            <form className="form-horizontal" onSubmit={this.validateAndRegister.bind(this)}>
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
            </form>
          </div>
        </div>
      </div>
    );
  }
}