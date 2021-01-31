import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Lobby,
  useViewLobbyPage_LeaveLobbyMutation,
} from '../../../services/graphql/generated';

interface Props {
  lobby: Lobby;
}

const ViewLobby: FC<Props> = (props) => {
  const { lobby } = props;

  const history = useHistory();
  const [leaveLobby, { loading }] = useViewLobbyPage_LeaveLobbyMutation();

  const onLeaveLobby = useCallback(() => {
    (async () => {
      await leaveLobby();
      history.push('/');
    })();
  }, [history, leaveLobby]);

  return (
    <div>
      <h1>View lobby</h1>

      <br />
      <br />
      <br />

      <p>Code: {lobby.id}</p>

      <button disabled={loading} onClick={onLeaveLobby}>
        Leave lobby
      </button>
    </div>
  );
};

export default ViewLobby;
