import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import A from '../components/A';
import B from '../components/B';

const Routes = () => (
    <div>
        <Route exact path="/" component={ A }></Route>
        <Route path="/b" component={ B }></Route>
    </div>
);

export default Routes;
