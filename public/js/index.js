import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// bootstrap-material js dependencies
import 'bootstrap-material-design/dist/js/material';
import 'bootstrap-material-design/dist/js/ripples';
// Promise polyfill for compatibility
import { polyfill } from 'es6-promise';

import 'bootstrap-less/bootstrap/index.less';
import 'bootstrap-material-design/less/bootstrap-material-design.less';
import 'bootstrap-material-design/less/ripples.less';
import '../css/app.less';

import AppRouter from './AppRouter';
import reducer from './reducers';

const App = (props) => {
  return (
    <MuiThemeProvider>
      <AppRouter history={browserHistory}/>
    </MuiThemeProvider>
  );
};

const store = createStore(reducer);

polyfill();
injectTapEventPlugin();
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
