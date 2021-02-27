import { gql } from '@apollo/client';

import { LobbyFragment } from '../fragments/LobbyFragment';

export const leaveLobby = gql`
  mutation LeaveLobby {
    leaveLobby {
      id
      lobby {
        ...LobbyFragment
      }
    }
  }
  ${LobbyFragment}
`;
