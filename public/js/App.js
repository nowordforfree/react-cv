import React from 'react';
import { browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import AppRouter from './AppRouter';
import store from './store';

export default () => (
  <Provider store={store}>
    <MuiThemeProvider>
      <AppRouter history={browserHistory}/>
    </MuiThemeProvider>
  </Provider>
);