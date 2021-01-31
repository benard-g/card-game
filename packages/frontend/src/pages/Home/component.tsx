import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import GraphqlError from '../../components/GraphqlError';
import Loader from '../../components/Loader';
import { useHomePageQuery } from '../../services/graphql/generated';

const HomePage: FC = () => {
  const { data, loading, error } = useHomePageQuery();
  const uid = data?.viewer.id;
  const lobby = data?.viewer.lobby;

  if (loading) {
    return <Loader />;
  }
  if (error || !data) {
    return <GraphqlError error={error} />;
  }

  return (
    <div>
      <h1>Home</h1>
      <p>uid: {uid}</p>

      <br />
      <br />
      <br />

      {!!lobby ? (
        <div>
          <p>You are in lobby: {lobby.id}</p>
          <Link to={`/lobbies/${lobby.id}`}>Go to lobby</Link>
        </div>
      ) : (
        <div>
          <p>You are not part of a lobby</p>
          <Link to="lobbies/create">Create lobby</Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
