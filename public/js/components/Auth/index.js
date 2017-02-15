import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import LoginForm from '../../containers/LoginForm';
import RegistrationForm from '../../containers/RegistrationForm';

export default () => (
  <div className="row">
    <div className="col-md-offset-2 col-md-8">
      <Tabs>
        <Tab title="Sign In as registered user" label="Login" value="login">
          <LoginForm />
        </Tab>
        <Tab title="Register as new user" label="Register" value="register">
          <RegistrationForm />
        </Tab>
      </Tabs>
    </div>
  </div>
);
