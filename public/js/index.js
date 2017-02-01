import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Promise polyfill for compatibility
import { polyfill } from 'es6-promise';

import 'bootstrap-less/bootstrap/index.less';
import '../css/app.less';

import App from './App';

polyfill();
injectTapEventPlugin();

render(
  <App />,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(
      <App />,
      document.getElementById('app')
    );
  });
}
