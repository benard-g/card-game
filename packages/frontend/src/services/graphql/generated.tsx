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

export type Hello = {
  __typename?: 'Hello';
  id: Scalars['ID'];
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Hello;
};

export type AppQueryVariables = Exact<{ [key: string]: never; }>;


export type AppQuery = (
  { __typename?: 'Query' }
  & { hello: (
    { __typename?: 'Hello' }
    & Pick<Hello, 'id' | 'message'>
  ) }
);


export const AppDocument = gql`
    query App {
  hello {
    id
    message
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