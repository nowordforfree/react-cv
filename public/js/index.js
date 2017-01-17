import 'bootstrap/less/bootstrap.less';
import '../css/app.less';

import 'bootstrap/dist/js/bootstrap';
import ReactDom from 'react-dom';
import routes from './routes';
import { browserHistory } from 'react-router';

ReactDom.render(routes(browserHistory), document.getElementById('app'));
