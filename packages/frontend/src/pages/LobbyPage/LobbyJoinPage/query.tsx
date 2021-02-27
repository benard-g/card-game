import { gql } from '@apollo/client';

import { LobbyFragment } from '../../../graphql/fragments/LobbyFragment';

export const LobbyJoinPage = gql`
  query LobbyJoinPage($lobbyId: String!) {
    lobbyPreview(lobbyId: $lobbyId) {
      id
      nbMembers
    }

    viewer {
      id
      lobby {
        ...LobbyFragment
      }
    }
  }
  ${LobbyFragment}
`;
