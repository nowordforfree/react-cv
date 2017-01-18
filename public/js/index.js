import 'bootstrap/less/bootstrap.less';
import '../css/app.less';

import 'bootstrap/dist/js/bootstrap';
import React from 'react';
import ReactDom from 'react-dom';
import AppRouter from './AppRouter';
import { browserHistory } from 'react-router';

ReactDom.render(<AppRouter history={browserHistory}/>, document.getElementById('app'));
