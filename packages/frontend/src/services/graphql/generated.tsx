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

export type CreateLobbyInput = {
  userName: Scalars['String'];
};

export type JoinLobbyInput = {
  lobbyId: Scalars['String'];
  userName: Scalars['String'];
};

export type Lobby = {
  __typename?: 'Lobby';
  id: Scalars['ID'];
  members: Array<LobbyMember>;
};

export type LobbyMember = {
  __typename?: 'LobbyMember';
  id: Scalars['ID'];
  name: Scalars['String'];
  role: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createLobby: Viewer;
  joinLobby: Viewer;
  leaveLobby: Viewer;
};


export type MutationCreateLobbyArgs = {
  input: CreateLobbyInput;
};


export type MutationJoinLobbyArgs = {
  input: JoinLobbyInput;
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

export type HomePageQueryVariables = Exact<{ [key: string]: never; }>;


export type HomePageQuery = (
  { __typename?: 'Query' }
  & { viewer: (
    { __typename?: 'Viewer' }
    & Pick<Viewer, 'id'>
    & { lobby?: Maybe<(
      { __typename?: 'Lobby' }
      & Pick<Lobby, 'id'>
    )> }
  ) }
);

export type CreateLobbyPageQueryVariables = Exact<{ [key: string]: never; }>;


export type CreateLobbyPageQuery = (
  { __typename?: 'Query' }
  & { viewer: (
    { __typename?: 'Viewer' }
    & Pick<Viewer, 'id'>
    & { lobby?: Maybe<(
      { __typename?: 'Lobby' }
      & Pick<Lobby, 'id'>
    )> }
  ) }
);

export type CreateLobbyPage_CreateLobbyMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateLobbyPage_CreateLobbyMutation = (
  { __typename?: 'Mutation' }
  & { createLobby: (
    { __typename?: 'Viewer' }
    & Pick<Viewer, 'id'>
    & { lobby?: Maybe<(
      { __typename?: 'Lobby' }
      & Pick<Lobby, 'id'>
    )> }
  ) }
);

export type ViewLobbyPageQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewLobbyPageQuery = (
  { __typename?: 'Query' }
  & { viewer: (
    { __typename?: 'Viewer' }
    & Pick<Viewer, 'id'>
    & { lobby?: Maybe<(
      { __typename?: 'Lobby' }
      & Pick<Lobby, 'id'>
    )> }
  ) }
);

export type ViewLobbyPage_LeaveLobbyMutationVariables = Exact<{ [key: string]: never; }>;


export type ViewLobbyPage_LeaveLobbyMutation = (
  { __typename?: 'Mutation' }
  & { leaveLobby: (
    { __typename?: 'Viewer' }
    & Pick<Viewer, 'id'>
    & { lobby?: Maybe<(
      { __typename?: 'Lobby' }
      & Pick<Lobby, 'id'>
    )> }
  ) }
);


export const HomePageDocument = gql`
    query HomePage {
  viewer {
    id
    lobby {
      id
    }
  }
}
    `;

/**
 * __useHomePageQuery__
 *
 * To run a query within a React component, call `useHomePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomePageQuery({
 *   variables: {
 *   },
 * });
 */
export function useHomePageQuery(baseOptions?: Apollo.QueryHookOptions<HomePageQuery, HomePageQueryVariables>) {
        return Apollo.useQuery<HomePageQuery, HomePageQueryVariables>(HomePageDocument, baseOptions);
      }
export function useHomePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomePageQuery, HomePageQueryVariables>) {
          return Apollo.useLazyQuery<HomePageQuery, HomePageQueryVariables>(HomePageDocument, baseOptions);
        }
export type HomePageQueryHookResult = ReturnType<typeof useHomePageQuery>;
export type HomePageLazyQueryHookResult = ReturnType<typeof useHomePageLazyQuery>;
export type HomePageQueryResult = Apollo.QueryResult<HomePageQuery, HomePageQueryVariables>;
export const CreateLobbyPageDocument = gql`
    query CreateLobbyPage {
  viewer {
    id
    lobby {
      id
    }
  }
}
    `;

/**
 * __useCreateLobbyPageQuery__
 *
 * To run a query within a React component, call `useCreateLobbyPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useCreateLobbyPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCreateLobbyPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useCreateLobbyPageQuery(baseOptions?: Apollo.QueryHookOptions<CreateLobbyPageQuery, CreateLobbyPageQueryVariables>) {
        return Apollo.useQuery<CreateLobbyPageQuery, CreateLobbyPageQueryVariables>(CreateLobbyPageDocument, baseOptions);
      }
export function useCreateLobbyPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CreateLobbyPageQuery, CreateLobbyPageQueryVariables>) {
          return Apollo.useLazyQuery<CreateLobbyPageQuery, CreateLobbyPageQueryVariables>(CreateLobbyPageDocument, baseOptions);
        }
export type CreateLobbyPageQueryHookResult = ReturnType<typeof useCreateLobbyPageQuery>;
export type CreateLobbyPageLazyQueryHookResult = ReturnType<typeof useCreateLobbyPageLazyQuery>;
export type CreateLobbyPageQueryResult = Apollo.QueryResult<CreateLobbyPageQuery, CreateLobbyPageQueryVariables>;
export const CreateLobbyPage_CreateLobbyDocument = gql`
    mutation CreateLobbyPage_CreateLobby {
  createLobby(input: {userName: "Bob"}) {
    id
    lobby {
      id
    }
  }
}
    `;
export type CreateLobbyPage_CreateLobbyMutationFn = Apollo.MutationFunction<CreateLobbyPage_CreateLobbyMutation, CreateLobbyPage_CreateLobbyMutationVariables>;

/**
 * __useCreateLobbyPage_CreateLobbyMutation__
 *
 * To run a mutation, you first call `useCreateLobbyPage_CreateLobbyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLobbyPage_CreateLobbyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLobbyPageCreateLobbyMutation, { data, loading, error }] = useCreateLobbyPage_CreateLobbyMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateLobbyPage_CreateLobbyMutation(baseOptions?: Apollo.MutationHookOptions<CreateLobbyPage_CreateLobbyMutation, CreateLobbyPage_CreateLobbyMutationVariables>) {
        return Apollo.useMutation<CreateLobbyPage_CreateLobbyMutation, CreateLobbyPage_CreateLobbyMutationVariables>(CreateLobbyPage_CreateLobbyDocument, baseOptions);
      }
export type CreateLobbyPage_CreateLobbyMutationHookResult = ReturnType<typeof useCreateLobbyPage_CreateLobbyMutation>;
export type CreateLobbyPage_CreateLobbyMutationResult = Apollo.MutationResult<CreateLobbyPage_CreateLobbyMutation>;
export type CreateLobbyPage_CreateLobbyMutationOptions = Apollo.BaseMutationOptions<CreateLobbyPage_CreateLobbyMutation, CreateLobbyPage_CreateLobbyMutationVariables>;
export const ViewLobbyPageDocument = gql`
    query ViewLobbyPage {
  viewer {
    id
    lobby {
      id
    }
  }
}
    `;

/**
 * __useViewLobbyPageQuery__
 *
 * To run a query within a React component, call `useViewLobbyPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewLobbyPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewLobbyPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useViewLobbyPageQuery(baseOptions?: Apollo.QueryHookOptions<ViewLobbyPageQuery, ViewLobbyPageQueryVariables>) {
        return Apollo.useQuery<ViewLobbyPageQuery, ViewLobbyPageQueryVariables>(ViewLobbyPageDocument, baseOptions);
      }
export function useViewLobbyPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewLobbyPageQuery, ViewLobbyPageQueryVariables>) {
          return Apollo.useLazyQuery<ViewLobbyPageQuery, ViewLobbyPageQueryVariables>(ViewLobbyPageDocument, baseOptions);
        }
export type ViewLobbyPageQueryHookResult = ReturnType<typeof useViewLobbyPageQuery>;
export type ViewLobbyPageLazyQueryHookResult = ReturnType<typeof useViewLobbyPageLazyQuery>;
export type ViewLobbyPageQueryResult = Apollo.QueryResult<ViewLobbyPageQuery, ViewLobbyPageQueryVariables>;
export const ViewLobbyPage_LeaveLobbyDocument = gql`
    mutation ViewLobbyPage_LeaveLobby {
  leaveLobby {
    id
    lobby {
      id
    }
  }
}
    `;
export type ViewLobbyPage_LeaveLobbyMutationFn = Apollo.MutationFunction<ViewLobbyPage_LeaveLobbyMutation, ViewLobbyPage_LeaveLobbyMutationVariables>;

/**
 * __useViewLobbyPage_LeaveLobbyMutation__
 *
 * To run a mutation, you first call `useViewLobbyPage_LeaveLobbyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useViewLobbyPage_LeaveLobbyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [viewLobbyPageLeaveLobbyMutation, { data, loading, error }] = useViewLobbyPage_LeaveLobbyMutation({
 *   variables: {
 *   },
 * });
 */
export function useViewLobbyPage_LeaveLobbyMutation(baseOptions?: Apollo.MutationHookOptions<ViewLobbyPage_LeaveLobbyMutation, ViewLobbyPage_LeaveLobbyMutationVariables>) {
        return Apollo.useMutation<ViewLobbyPage_LeaveLobbyMutation, ViewLobbyPage_LeaveLobbyMutationVariables>(ViewLobbyPage_LeaveLobbyDocument, baseOptions);
      }
export type ViewLobbyPage_LeaveLobbyMutationHookResult = ReturnType<typeof useViewLobbyPage_LeaveLobbyMutation>;
export type ViewLobbyPage_LeaveLobbyMutationResult = Apollo.MutationResult<ViewLobbyPage_LeaveLobbyMutation>;
export type ViewLobbyPage_LeaveLobbyMutationOptions = Apollo.BaseMutationOptions<ViewLobbyPage_LeaveLobbyMutation, ViewLobbyPage_LeaveLobbyMutationVariables>;
export const namedOperations = {
  Query: {
    HomePage: 'HomePage',
    CreateLobbyPage: 'CreateLobbyPage',
    ViewLobbyPage: 'ViewLobbyPage'
  },
  Mutation: {
    CreateLobbyPage_CreateLobby: 'CreateLobbyPage_CreateLobby',
    ViewLobbyPage_LeaveLobby: 'ViewLobbyPage_LeaveLobby'
  }
}