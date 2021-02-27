import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';

import GraphqlError from '../../../components/GraphqlError';
import Loader from '../../../components/Loader';
import {
  useLeaveLobbyMutation,
  useLobbyPageQuery,
} from '../../../graphql/codegen';

const LobbyPage: FC = () => {
  const { data, loading, error } = useLobbyPageQuery();
  const [
    leaveLobbyMutation,
    { loading: leaveLobbyMutationLoading },
  ] = useLeaveLobbyMutation();

  if (loading) {
    return <Loader />;
  }
  if (error || !data) {
    return <GraphqlError error={error} />;
  }

  const { viewer } = data;
  const { lobby } = viewer;

  if (!lobby) {
    return <Redirect to="/" />;
  }

  const onCopyInviteLink = async () => {
    // We need to detect the kind of Router used for the navigation in order
    // to generate a valid invitation link
    const isHashRouter = !!window.location.hash;
    const baseUrl = `${window.location.origin}${isHashRouter ? '/#' : ''}`;
    const inviteLink = `${baseUrl}/lobby/join?c=${lobby.id}`;

    await navigator.clipboard.writeText(inviteLink);
  };

  const onLeaveLobby = async () => {
    await leaveLobbyMutation();
  };

  return (
    <div>
      <p>Lobby Page</p>

      <br />

      <p>ID: {lobby.id}</p>
      <button onClick={onCopyInviteLink}>Copy invite link</button>

      <br />
      <br />
      <br />

      <ul>
        {lobby.members.map((member) => (
          <li key={member.id}>
            <p>ID: {member.id}</p>
            <p>Name: {member.name}</p>
            <p>Role: {member.role}</p>
            <br />
          </li>
        ))}
      </ul>

      <br />
      <button disabled={leaveLobbyMutationLoading} onClick={onLeaveLobby}>
        Leave lobby
      </button>
    </div>
  );
};

export default LobbyPage;
