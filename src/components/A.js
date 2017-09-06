import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './ARedux';
import minux from './BRedux';
import { Map, is } from 'immutable';

class ModuleA extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            num: 0,
            count: {
                num: 0
            },
            mapCount: Map({
                num: 0
            })
        };

        this.handlePlusNumber = this.handlePlusNumber.bind(this);
    }

    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log(this.state.count, nextState.count)
        const thisProps = this.props || {}, thisState = this.state || {};

        if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
            Object.keys(thisState).length !== Object.keys(nextState).length) {
            return true;
        }

        for (const key in nextProps) {
            if (!is(thisProps[key], nextProps[key])) {
                return true;
            }
        }

        for (const key in nextState) {
            if (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
                return true;
            }
        }
        return false;
    }

    handlePlusNumber() {
        let count = this.state.count;
        count.num = count.num + 1;
        this.setState({
            count,
        });
        this.setState(({ mapCount }) => ({
            mapCount: mapCount.update('num', n => n + 1)
        }));
        console.log(this.state.count.num, '普通的count');
        console.log(this.state.mapCount.get('num'), 'map Count');
        this.props.minux();
    }

    render() {
        return (
            <div>
                <input type="text" name="input" value={ this.state.input } onChange={ this.handleInput.bind(this) }/>
                <p>计数: { this.state.mapCount.get('num') } { this.props.num }</p>
                <button onClick={ this.handlePlusNumber }>+</button>
            </div>
        )
    }

    componentDidMount() {
        // this.props.Add()
    }
}

export default connect(({ num }) => {
    return {
        num
    }
}, (dispatch) => {
    return {
        ...bindActionCreators(actions, dispatch),
        minux: () => {
            dispatch({
                type: "Minux"
            })
        }
    }
})(ModuleA);
