import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Routes from 'routes';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import configStore from 'redux/configStore.js';


const initialState = window.__INITIAL_STATE__;
const store = configStore(initialState);

const App = () => (
    <Provider store={ store }>
        <Router>
            <Routes></Routes>
        </Router>
    </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))
