import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { useCreateLobbyMutation } from '../../../../graphql/codegen';

const CreateLobby: FC = () => {
  const history = useHistory();

  const [
    createLobbyMutation,
    { loading: createLobbyMutationLoading, error: createLobbyMutationError },
  ] = useCreateLobbyMutation();

  const onCreateLobby = async () => {
    try {
      await createLobbyMutation({
        variables: {
          input: {
            userName: 'Adam',
          },
        },
      });
      history.push('/lobby');
    } catch (_err) {} // Error is handled by component
  };

  return (
    <div>
      <p>Create Lobby</p>

      <br />
      <p>TODO: choose your avatar</p>

      <p>TODO: choose your name</p>

      <br />
      <button disabled={createLobbyMutationLoading} onClick={onCreateLobby}>
        New lobby
      </button>
      {!createLobbyMutationError ? null : (
        <p>{createLobbyMutationError.message}</p>
      )}
    </div>
  );
};

export default CreateLobby;
