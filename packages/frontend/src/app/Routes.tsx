import { Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';

import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />

      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default Routes;
