import { gql } from '@apollo/client';

import { LobbyFragment } from '../fragments/LobbyFragment';

export const createLobby = gql`
  mutation CreateLobby($input: CreateLobbyInput!) {
    createLobby(input: $input) {
      id
      lobby {
        ...LobbyFragment
      }
    }
  }
  ${LobbyFragment}
`;
