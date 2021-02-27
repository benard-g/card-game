import { gql } from '@apollo/client';

export const LobbyFragment = gql`
  fragment LobbyFragment on Lobby {
    id
    members {
      id
      name
      role
    }
  }
`;
