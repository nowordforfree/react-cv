import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
// Promise polyfill for compatibility
import { polyfill } from 'es6-promise';

import 'bootstrap-less/bootstrap/index.less';
import '../css/app.less';

import AppRouter from './AppRouter';
import store from './store';

const App = () => (
  <MuiThemeProvider>
    <AppRouter history={browserHistory}/>
  </MuiThemeProvider>
);

polyfill();
injectTapEventPlugin();
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
