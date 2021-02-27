import React, { FC } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import GraphqlError from '../../../components/GraphqlError';
import Loader from '../../../components/Loader';
import {
  useJoinLobbyMutation,
  useLeaveLobbyMutation,
  useLobbyJoinPageQuery,
} from '../../../graphql/codegen';
import { useQueryParams } from '../../../hooks/useQueryParams';

const LobbyJoinPage: FC = () => {
  const history = useHistory();
  const params = useQueryParams();
  const lobbyCode = params.get('c');

  const { data, loading, error } = useLobbyJoinPageQuery({
    fetchPolicy: 'cache-and-network',
    variables: { lobbyId: lobbyCode || '' },
  });
  const [
    joinLobbyMutation,
    { loading: joinLobbyMutationLoading, error: joinLobbyMutationError },
  ] = useJoinLobbyMutation();
  const [
    leaveLobbyMutation,
    { loading: leaveLobbyMutationLoading, error: leaveLobbyMutationError },
  ] = useLeaveLobbyMutation();
  const mutationLoading = joinLobbyMutationLoading || leaveLobbyMutationLoading;
  const mutationError = joinLobbyMutationError || leaveLobbyMutationError;

  if (loading) {
    return <Loader />;
  }
  if (error || !data) {
    return <GraphqlError error={error} />;
  }

  const { lobbyPreview, viewer } = data;
  if (!lobbyPreview) {
    return <Redirect to="/" />;
  }

  const isViewerInALobby = !!viewer.lobby;
  const isViewerAlreadyInThisLobby = viewer.lobby?.id === lobbyPreview.id;
  if (isViewerAlreadyInThisLobby) {
    return <Redirect to="/lobby" />;
  }

  const onJoinLobby = async () => {
    try {
      if (isViewerInALobby) {
        await leaveLobbyMutation();
      }
      await joinLobbyMutation({
        variables: {
          input: {
            lobbyId: lobbyPreview.id,
            userName: 'Bob',
          },
        },
      });
      history.push('/lobby');
    } catch (_err) {} // Error is handled by component
  };

  return (
    <div>
      <p>Lobby</p>

      <br />
      <p>Lobby ID: {lobbyPreview.id}</p>
      <p>Nb members: {lobbyPreview.nbMembers}</p>

      <br />
      <p>TODO: choose your avatar</p>
      <p>TODO: choose your name</p>

      <br />
      <button disabled={mutationLoading} onClick={onJoinLobby}>
        Join Lobby
      </button>
      {!mutationError ? null : <p>{mutationError.message}</p>}
    </div>
  );
};

export default LobbyJoinPage;
