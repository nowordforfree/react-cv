import React from 'react';
import { IndexRoute, Route, Router } from 'react-router';

import Error404 from './components/Error404';
import Root from './components/Root';
import Home from './components/Home';
import Login from './components/Login';

export default (history) => {
    return (
        <Router history={history}>
            <Route path='/' component={Root}>
                <IndexRoute component={Home}/>
                <Route path='/login' component={Login}/>
                <Route path='*' component={Error404}/>
            </Route>
        </Router>
    );
}