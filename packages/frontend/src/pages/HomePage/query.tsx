import { gql } from '@apollo/client';

import { LobbyFragment } from '../../graphql/fragments/LobbyFragment';

export const HomePage = gql`
  query HomePage {
    viewer {
      id
      lobby {
        ...LobbyFragment
      }
    }
  }
  ${LobbyFragment}
`;
