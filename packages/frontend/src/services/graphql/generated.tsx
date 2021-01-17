import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type LeaveLobbyResponse = {
  __typename?: 'LeaveLobbyResponse';
  code?: Maybe<Scalars['String']>;
};

export type Lobby = {
  __typename?: 'Lobby';
  code: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createLobby: Lobby;
  leaveLobby: LeaveLobbyResponse;
};

export type Query = {
  __typename?: 'Query';
  viewer: Viewer;
};

export type Viewer = {
  __typename?: 'Viewer';
  id: Scalars['ID'];
  lobby?: Maybe<Lobby>;
};

export type AppQueryVariables = Exact<{ [key: string]: never; }>;


export type AppQuery = (
  { __typename?: 'Query' }
  & { viewer: (
    { __typename?: 'Viewer' }
    & Pick<Viewer, 'id'>
  ) }
);


export const AppDocument = gql`
    query App {
  viewer {
    id
  }
}
    `;

/**
 * __useAppQuery__
 *
 * To run a query within a React component, call `useAppQuery` and pass it any options that fit your needs.
 * When your component renders, `useAppQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAppQuery({
 *   variables: {
 *   },
 * });
 */
export function useAppQuery(baseOptions?: Apollo.QueryHookOptions<AppQuery, AppQueryVariables>) {
        return Apollo.useQuery<AppQuery, AppQueryVariables>(AppDocument, baseOptions);
      }
export function useAppLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AppQuery, AppQueryVariables>) {
          return Apollo.useLazyQuery<AppQuery, AppQueryVariables>(AppDocument, baseOptions);
        }
export type AppQueryHookResult = ReturnType<typeof useAppQuery>;
export type AppLazyQueryHookResult = ReturnType<typeof useAppLazyQuery>;
export type AppQueryResult = Apollo.QueryResult<AppQuery, AppQueryVariables>;