import { ErrorCode } from '@packages/lib-shared';
import { GraphQLError } from 'graphql';

export function mapErrorCode(error: GraphQLError): string | undefined {
  const errorCode = error.extensions?.code as ErrorCode | undefined;

  switch (errorCode) {
    case ErrorCode.USER_ALREADY_IN_LOBBY:
      return 'User already in lobby';
    default:
      return undefined;
  }
}
