import React, { FC } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import LobbyJoinPage from './LobbyJoinPage';
import LobbyViewPage from './LobbyViewPage';

const LobbyRoutes: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <LobbyViewPage />
      </Route>

      <Route path={`${path}/join`}>
        <LobbyJoinPage />
      </Route>

      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default LobbyRoutes;
