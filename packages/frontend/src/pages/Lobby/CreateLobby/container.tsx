import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import GraphqlError from '../../../components/GraphqlError';
import Loader from '../../../components/Loader';
import { useCreateLobbyPageQuery } from '../../../services/graphql/generated';

import CreateLobby from './component';

const CreateLobbyPage: FC = () => {
  const { data, loading, error } = useCreateLobbyPageQuery();
  const lobby = data?.viewer.lobby;

  if (loading) {
    return <Loader />;
  }
  if (error || !data) {
    return <GraphqlError error={error} />;
  }

  return (
    <>
      <Helmet>
        <title>Card game - Create a new Lobby</title>
      </Helmet>

      {!!lobby ? (
        <div>
          <p>You already are in a lobby.</p>

          <br />
          <br />
          <br />

          <Link to={`/lobbies/${lobby.id}`} replace>
            Go to lobby
          </Link>
        </div>
      ) : (
        <CreateLobby />
      )}
    </>
  );
};

export default CreateLobbyPage;
