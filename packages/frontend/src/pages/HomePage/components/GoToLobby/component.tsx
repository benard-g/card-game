import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { Lobby } from '../../../../graphql/codegen';

interface Props {
  lobby: Lobby;
}

const GoToLobby: FC<Props> = (props) => {
  const { lobby } = props;

  return (
    <div>
      <p>You already are in a lobby</p>

      <p>Nb members: {lobby.members.length}</p>

      <Link to="/lobby">Go to Lobby</Link>
    </div>
  );
};

export default GoToLobby;
