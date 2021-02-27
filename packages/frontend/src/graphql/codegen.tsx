import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
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

export type LobbyPreview = {
  __typename?: 'LobbyPreview';
  id: Scalars['ID'];
  nbMembers: Scalars['Int'];
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
  lobbyPreview?: Maybe<LobbyPreview>;
  viewer: Viewer;
};

export type QueryLobbyPreviewArgs = {
  lobbyId: Scalars['String'];
};

export type Viewer = {
  __typename?: 'Viewer';
  id: Scalars['ID'];
  lobby?: Maybe<Lobby>;
};

export type LobbyFragmentFragment = { __typename?: 'Lobby' } & Pick<
  Lobby,
  'id'
> & {
    members: Array<
      { __typename?: 'LobbyMember' } & Pick<LobbyMember, 'id' | 'name' | 'role'>
    >;
  };

export type CreateLobbyMutationVariables = Exact<{
  input: CreateLobbyInput;
}>;

export type CreateLobbyMutation = { __typename?: 'Mutation' } & {
  createLobby: { __typename?: 'Viewer' } & Pick<Viewer, 'id'> & {
      lobby?: Maybe<{ __typename?: 'Lobby' } & LobbyFragmentFragment>;
    };
};

export type LeaveLobbyMutationVariables = Exact<{ [key: string]: never }>;

export type LeaveLobbyMutation = { __typename?: 'Mutation' } & {
  leaveLobby: { __typename?: 'Viewer' } & Pick<Viewer, 'id'> & {
      lobby?: Maybe<{ __typename?: 'Lobby' } & LobbyFragmentFragment>;
    };
};

export type HomePageQueryVariables = Exact<{ [key: string]: never }>;

export type HomePageQuery = { __typename?: 'Query' } & {
  viewer: { __typename?: 'Viewer' } & Pick<Viewer, 'id'> & {
      lobby?: Maybe<{ __typename?: 'Lobby' } & LobbyFragmentFragment>;
    };
};

export type LobbyPageQueryVariables = Exact<{ [key: string]: never }>;

export type LobbyPageQuery = { __typename?: 'Query' } & {
  viewer: { __typename?: 'Viewer' } & Pick<Viewer, 'id'> & {
      lobby?: Maybe<{ __typename?: 'Lobby' } & LobbyFragmentFragment>;
    };
};

export type JoinLobbyMutationVariables = Exact<{
  input: JoinLobbyInput;
}>;

export type JoinLobbyMutation = { __typename?: 'Mutation' } & {
  joinLobby: { __typename?: 'Viewer' } & Pick<Viewer, 'id'> & {
      lobby?: Maybe<{ __typename?: 'Lobby' } & LobbyFragmentFragment>;
    };
};

export type LobbyJoinPageQueryVariables = Exact<{
  lobbyId: Scalars['String'];
}>;

export type LobbyJoinPageQuery = { __typename?: 'Query' } & {
  lobbyPreview?: Maybe<
    { __typename?: 'LobbyPreview' } & Pick<LobbyPreview, 'id' | 'nbMembers'>
  >;
  viewer: { __typename?: 'Viewer' } & Pick<Viewer, 'id'> & {
      lobby?: Maybe<{ __typename?: 'Lobby' } & LobbyFragmentFragment>;
    };
};

export const LobbyFragmentFragmentDoc = gql`
  fragment LobbyFragment on Lobby {
    id
    members {
      id
      name
      role
    }
  }
`;
export const CreateLobbyDocument = gql`
  mutation CreateLobby($input: CreateLobbyInput!) {
    createLobby(input: $input) {
      id
      lobby {
        ...LobbyFragment
      }
    }
  }
  ${LobbyFragmentFragmentDoc}
`;
export type CreateLobbyMutationFn = Apollo.MutationFunction<
  CreateLobbyMutation,
  CreateLobbyMutationVariables
>;

/**
 * __useCreateLobbyMutation__
 *
 * To run a mutation, you first call `useCreateLobbyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLobbyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLobbyMutation, { data, loading, error }] = useCreateLobbyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateLobbyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateLobbyMutation,
    CreateLobbyMutationVariables
  >,
) {
  return Apollo.useMutation<CreateLobbyMutation, CreateLobbyMutationVariables>(
    CreateLobbyDocument,
    baseOptions,
  );
}
export type CreateLobbyMutationHookResult = ReturnType<
  typeof useCreateLobbyMutation
>;
export type CreateLobbyMutationResult = Apollo.MutationResult<CreateLobbyMutation>;
export type CreateLobbyMutationOptions = Apollo.BaseMutationOptions<
  CreateLobbyMutation,
  CreateLobbyMutationVariables
>;
export const LeaveLobbyDocument = gql`
  mutation LeaveLobby {
    leaveLobby {
      id
      lobby {
        ...LobbyFragment
      }
    }
  }
  ${LobbyFragmentFragmentDoc}
`;
export type LeaveLobbyMutationFn = Apollo.MutationFunction<
  LeaveLobbyMutation,
  LeaveLobbyMutationVariables
>;

/**
 * __useLeaveLobbyMutation__
 *
 * To run a mutation, you first call `useLeaveLobbyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveLobbyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveLobbyMutation, { data, loading, error }] = useLeaveLobbyMutation({
 *   variables: {
 *   },
 * });
 */
export function useLeaveLobbyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LeaveLobbyMutation,
    LeaveLobbyMutationVariables
  >,
) {
  return Apollo.useMutation<LeaveLobbyMutation, LeaveLobbyMutationVariables>(
    LeaveLobbyDocument,
    baseOptions,
  );
}
export type LeaveLobbyMutationHookResult = ReturnType<
  typeof useLeaveLobbyMutation
>;
export type LeaveLobbyMutationResult = Apollo.MutationResult<LeaveLobbyMutation>;
export type LeaveLobbyMutationOptions = Apollo.BaseMutationOptions<
  LeaveLobbyMutation,
  LeaveLobbyMutationVariables
>;
export const HomePageDocument = gql`
  query HomePage {
    viewer {
      id
      lobby {
        ...LobbyFragment
      }
    }
  }
  ${LobbyFragmentFragmentDoc}
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
export function useHomePageQuery(
  baseOptions?: Apollo.QueryHookOptions<HomePageQuery, HomePageQueryVariables>,
) {
  return Apollo.useQuery<HomePageQuery, HomePageQueryVariables>(
    HomePageDocument,
    baseOptions,
  );
}
export function useHomePageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    HomePageQuery,
    HomePageQueryVariables
  >,
) {
  return Apollo.useLazyQuery<HomePageQuery, HomePageQueryVariables>(
    HomePageDocument,
    baseOptions,
  );
}
export type HomePageQueryHookResult = ReturnType<typeof useHomePageQuery>;
export type HomePageLazyQueryHookResult = ReturnType<
  typeof useHomePageLazyQuery
>;
export type HomePageQueryResult = Apollo.QueryResult<
  HomePageQuery,
  HomePageQueryVariables
>;
export const LobbyPageDocument = gql`
  query LobbyPage {
    viewer {
      id
      lobby {
        ...LobbyFragment
      }
    }
  }
  ${LobbyFragmentFragmentDoc}
`;

/**
 * __useLobbyPageQuery__
 *
 * To run a query within a React component, call `useLobbyPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useLobbyPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLobbyPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useLobbyPageQuery(
  baseOptions?: Apollo.QueryHookOptions<
    LobbyPageQuery,
    LobbyPageQueryVariables
  >,
) {
  return Apollo.useQuery<LobbyPageQuery, LobbyPageQueryVariables>(
    LobbyPageDocument,
    baseOptions,
  );
}
export function useLobbyPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LobbyPageQuery,
    LobbyPageQueryVariables
  >,
) {
  return Apollo.useLazyQuery<LobbyPageQuery, LobbyPageQueryVariables>(
    LobbyPageDocument,
    baseOptions,
  );
}
export type LobbyPageQueryHookResult = ReturnType<typeof useLobbyPageQuery>;
export type LobbyPageLazyQueryHookResult = ReturnType<
  typeof useLobbyPageLazyQuery
>;
export type LobbyPageQueryResult = Apollo.QueryResult<
  LobbyPageQuery,
  LobbyPageQueryVariables
>;
export const JoinLobbyDocument = gql`
  mutation JoinLobby($input: JoinLobbyInput!) {
    joinLobby(input: $input) {
      id
      lobby {
        ...LobbyFragment
      }
    }
  }
  ${LobbyFragmentFragmentDoc}
`;
export type JoinLobbyMutationFn = Apollo.MutationFunction<
  JoinLobbyMutation,
  JoinLobbyMutationVariables
>;

/**
 * __useJoinLobbyMutation__
 *
 * To run a mutation, you first call `useJoinLobbyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinLobbyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinLobbyMutation, { data, loading, error }] = useJoinLobbyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useJoinLobbyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    JoinLobbyMutation,
    JoinLobbyMutationVariables
  >,
) {
  return Apollo.useMutation<JoinLobbyMutation, JoinLobbyMutationVariables>(
    JoinLobbyDocument,
    baseOptions,
  );
}
export type JoinLobbyMutationHookResult = ReturnType<
  typeof useJoinLobbyMutation
>;
export type JoinLobbyMutationResult = Apollo.MutationResult<JoinLobbyMutation>;
export type JoinLobbyMutationOptions = Apollo.BaseMutationOptions<
  JoinLobbyMutation,
  JoinLobbyMutationVariables
>;
export const LobbyJoinPageDocument = gql`
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
  ${LobbyFragmentFragmentDoc}
`;

/**
 * __useLobbyJoinPageQuery__
 *
 * To run a query within a React component, call `useLobbyJoinPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useLobbyJoinPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLobbyJoinPageQuery({
 *   variables: {
 *      lobbyId: // value for 'lobbyId'
 *   },
 * });
 */
export function useLobbyJoinPageQuery(
  baseOptions: Apollo.QueryHookOptions<
    LobbyJoinPageQuery,
    LobbyJoinPageQueryVariables
  >,
) {
  return Apollo.useQuery<LobbyJoinPageQuery, LobbyJoinPageQueryVariables>(
    LobbyJoinPageDocument,
    baseOptions,
  );
}
export function useLobbyJoinPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LobbyJoinPageQuery,
    LobbyJoinPageQueryVariables
  >,
) {
  return Apollo.useLazyQuery<LobbyJoinPageQuery, LobbyJoinPageQueryVariables>(
    LobbyJoinPageDocument,
    baseOptions,
  );
}
export type LobbyJoinPageQueryHookResult = ReturnType<
  typeof useLobbyJoinPageQuery
>;
export type LobbyJoinPageLazyQueryHookResult = ReturnType<
  typeof useLobbyJoinPageLazyQuery
>;
export type LobbyJoinPageQueryResult = Apollo.QueryResult<
  LobbyJoinPageQuery,
  LobbyJoinPageQueryVariables
>;
export const namedOperations = {
  Query: {
    HomePage: 'HomePage',
    LobbyPage: 'LobbyPage',
    LobbyJoinPage: 'LobbyJoinPage',
  },
  Mutation: {
    CreateLobby: 'CreateLobby',
    LeaveLobby: 'LeaveLobby',
    JoinLobby: 'JoinLobby',
  },
  Fragment: {
    LobbyFragment: 'LobbyFragment',
  },
};
