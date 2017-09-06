import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
// import { routerReducer } from 'react-router-redux';
import reducer from './reducer.js';

const finalCreateStore = (initialState) => {
    return createStore(reducer, initialState);
};

export default finalCreateStore;
