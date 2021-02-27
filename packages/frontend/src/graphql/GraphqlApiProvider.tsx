import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React, { FC } from 'react';

import { config } from '../config';

import introspection from './codegenPossibleTypes';

const apolloClient = new ApolloClient({
  uri: `${config.API_URI}/api/graphql`,
  cache: new InMemoryCache({ possibleTypes: introspection.possibleTypes }),
  credentials: 'include',
  connectToDevTools: config.NODE_ENV === 'development',
});

const GraphqlApiProvider: FC = (props) => {
  const { children } = props;

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default GraphqlApiProvider;
