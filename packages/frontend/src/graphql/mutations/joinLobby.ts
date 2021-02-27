import { gql } from '@apollo/client';

import { LobbyFragment } from '../fragments/LobbyFragment';

export const joinLobby = gql`
  mutation JoinLobby($input: JoinLobbyInput!) {
    joinLobby(input: $input) {
      id
      lobby {
        ...LobbyFragment
      }
    }
  }
  ${LobbyFragment}
`;
