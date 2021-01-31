import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { useCreateLobbyPage_CreateLobbyMutation } from '../../../services/graphql/generated';

const CreateLobby: FC = () => {
  const history = useHistory();

  const [createLobby, { loading }] = useCreateLobbyPage_CreateLobbyMutation();

  const onCreateLobby = useCallback(() => {
    (async () => {
      const { data } = await createLobby();
      const lobbyId = data?.createLobby.lobby?.id;
      if (lobbyId) {
        history.replace(`/lobbies/${lobbyId}`);
      }
    })();
  }, [createLobby, history]);

  return (
    <div>
      <h1>Create lobby</h1>

      <br />
      <br />
      <br />

      <button disabled={loading} onClick={onCreateLobby}>
        Create a new lobby
      </button>
    </div>
  );
};

export default CreateLobby;
