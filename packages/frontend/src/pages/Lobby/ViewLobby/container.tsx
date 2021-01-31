import React, { FC, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';

import GraphqlError from '../../../components/GraphqlError';
import Loader from '../../../components/Loader';
import { useViewLobbyPageQuery } from '../../../services/graphql/generated';

import ViewLobby from './component';

interface RouteParams {
  id: string;
}

const ViewLobbyPage: FC = () => {
  const { id } = useParams<RouteParams>();

  const { data, loading, error } = useViewLobbyPageQuery();

  const [canViewLobby, setCanViewLobby] = useState<boolean | undefined>(
    undefined,
  );

  useEffect(() => {
    if (!loading && data) {
      const { lobby } = data.viewer;
      setCanViewLobby(lobby?.id === id);
    }
  }, [loading, data, id]);

  if (loading) {
    return <Loader />;
  }
  if (error || !data) {
    return <GraphqlError error={error} />;
  }
  if (canViewLobby === undefined) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <title>Card game - {id}</title>
      </Helmet>

      {!canViewLobby || !data.viewer.lobby ? (
        <div>
          <p>Lobby {id} not accessible</p>
          <Link to="/">Go to home</Link>
        </div>
      ) : (
        <ViewLobby lobby={data.viewer.lobby} />
      )}
    </>
  );
};

export default ViewLobbyPage;
