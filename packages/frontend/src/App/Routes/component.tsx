import React, { FC, lazy, Suspense } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from 'react-router-dom';

import Loader from '../../components/Loader';
import HomePage from '../../pages/Home';

const LobbyPage = lazy(() => import('../../pages/Lobby'));

const LazyRoute: FC<RouteProps> = ({ children, ...props }) => {
  return (
    <Route {...props}>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </Route>
  );
};

const Routes: FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>

        <LazyRoute path="/lobbies">
          <LobbyPage />
        </LazyRoute>

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
