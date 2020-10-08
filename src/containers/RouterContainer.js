import React from 'react';
import { BrowserRouter as Router, Switch, Route,  } from "react-router-dom";
import TravelContainer from './travels/TravelContainter';
import TravelCreateContainer from './travels/TravelCreateContainer';

const RouterContainer = props => (
    <Router>
        <Switch>
            <Route path="/" component={TravelContainer} exact />
            <Route path="/crear" component={TravelCreateContainer} />
        </Switch>
  </Router>
)

export default RouterContainer;