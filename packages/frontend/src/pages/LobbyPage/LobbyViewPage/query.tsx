import { gql } from '@apollo/client';

import { LobbyFragment } from '../../../graphql/fragments/LobbyFragment';

export const LobbyPage = gql`
  query LobbyPage {
    viewer {
      id
      lobby {
        ...LobbyFragment
      }
    }
  }
  ${LobbyFragment}
`;
