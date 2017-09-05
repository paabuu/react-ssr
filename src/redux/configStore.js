import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
// import { routerReducer } from 'react-router-redux';
import reducer from './reducer.js';


const store = createStore(reducer);

export default store;
