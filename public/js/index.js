import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// bootstrap-material js dependencies
import 'bootstrap-material-design/dist/js/material';
import 'bootstrap-material-design/dist/js/ripples';

import 'bootstrap-less/bootstrap/index.less';
import 'bootstrap-material-design/less/bootstrap-material-design.less';
import 'bootstrap-material-design/less/ripples.less';
import '../css/app.less';

import AppRouter from './AppRouter';

const App = (props) => {
  return (
    <MuiThemeProvider>
      <AppRouter history={browserHistory}/>
    </MuiThemeProvider>
  );
};

injectTapEventPlugin()
render(<App />, document.getElementById('app'));
