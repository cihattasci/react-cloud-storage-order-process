import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import SubscriptionPage from '../src/routes/SubscriptionPage';
import SuccessPage from '../src/routes/SuccessPage';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            
            <Route path="/" exact>
              <SubscriptionPage/>
            </Route>

            <Route path="/success" exact>
              <SuccessPage />
            </Route>

          </Switch>
        </Router>
      </div>
    );
  }
}

