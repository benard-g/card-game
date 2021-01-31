import React, { FC } from 'react';
import { GraphQLError } from 'graphql';

function mapErrorCode(error: GraphQLError): string | undefined {
  switch (error.extensions?.code) {
    // TODO import enum from backend
    default:
      return undefined;
  }
}

interface Props {
  error?: GraphQLError | Error;
}

const GraphqlError: FC<Props> = (props) => {
  const { error } = props;

  if (error instanceof GraphQLError) {
    const errorMessage = mapErrorCode(error);
    if (errorMessage) {
      return <p>Error: {errorMessage}</p>;
    }
  }

  return <p>Error: The operation failed.</p>;
};

export default GraphqlError;
