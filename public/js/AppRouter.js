import React from 'react';
import { IndexRoute, Route, Router } from 'react-router';

import Error404 from './components/Error404';
import Root from './components/Root';
import Home from './components/Home';
import Login from './components/Login';

export default class AppRouter extends React.Component {
    constructor(props) {
        super(props);
        let token = localStorage.getItem('token');
        let user = localStorage.getItem('user');
        if (user) {
            user = JSON.parse(user);
        }
        this.state = {
            signedIn: token && user
        };
    }
    isLoggedIn(nextState, replace, callback) {
        if (!this.state.signedIn) {
            replace('login');
        }
        callback();
    }
    render() {
        return (
            <Router history={this.props.history}>
                <Route path='/' component={Root}>
                    <IndexRoute component={Home} onEnter={this.isLoggedIn.bind(this)}/>
                    <Route path='login' component={Login}/>
                    <Route path='*' component={Error404}/>
                </Route>
            </Router>
        );
    }
}