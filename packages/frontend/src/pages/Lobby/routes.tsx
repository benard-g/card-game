import React, { FC } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import CreateLobbyPage from './CreateLobby';
import ViewLobbyPage from './ViewLobby';

const LobbyPage: FC = () => {
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${url}/create`}>
        <CreateLobbyPage />
      </Route>

      <Route path={`${url}/:id`}>
        <ViewLobbyPage />
      </Route>

      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default LobbyPage;
