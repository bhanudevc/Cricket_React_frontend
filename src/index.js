import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route, NavLink, BrowserRouter as Router, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Form from './container/Form';
import Display from './container/Display';
import Notfound from './container/Notfound';
import Teamdisplay from './container/Teamdisplay';

const routing = (
    <Router>
        <div>
            <NavLink activeClassName="active" to="/">Home</NavLink>&nbsp;
        <NavLink activeClassName="active" to="/register">Registration</NavLink>&nbsp;
        <NavLink activeClassName="active" to="/display">Display-player-details</NavLink>
        <NavLink activeClassName="active" to="/tdisplay">Display-team-player-details</NavLink>
        
            <Switch>
                <Route exact path="/" component={App} ></Route>
                <Route path="/register" component={Form} ></Route>
                <Route path="/display" component={Display} ></Route>
                <Route path="/tdisplay" component={Teamdisplay} ></Route>
                
                <Route component={Notfound}></Route>
            </Switch>
        </div>
    </Router>
);


ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
