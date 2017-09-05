import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Routes from 'routes';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from 'redux/configStore.js';


const initialState = window._INITIAL_STATE_;

const App = () => (
    <Provider store={ store }>
        <Router>
            <Routes></Routes>
        </Router>
    </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))
