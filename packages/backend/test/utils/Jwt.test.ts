import JsonWebToken from 'jsonwebtoken';

import { Jwt } from '../../src/utils/Jwt';

describe('utils/Jwt', () => {
  let jwt: Jwt;

  beforeEach(() => {
    jwt = new Jwt('secret');
  });

  describe('JWT', () => {
    interface Payload {
      value: number;
    }

    it('should correctly encode and decode a token', async () => {
      const payload: Payload = { value: 42 };

      const token = await jwt.createToken<Payload>(payload);
      expect(token).toEqual(expect.any(String));

      const decodedPayload = await jwt.decodeToken<Payload>(token);
      expect(decodedPayload).toEqual({
        value: 42,
      });
    });

    it('should throw an error if the token is malformed', async () => {
      const promise = jwt.decodeToken('some_invalid_token');

      await expect(promise).rejects.toThrowError('jwt malformed');
    });

    it('should throw an error if the token signature is invalid', async () => {
      const payload: Payload = { value: 42 };

      const token = await jwt.createToken(payload);

      // Change the value inside the token
      const decodedPayload = JsonWebToken.decode(token) as any;
      const mutatedToken = JsonWebToken.sign(
        {
          ...decodedPayload,
          value: 84,
        },
        'some_other_secret',
      );

      const promise = jwt.decodeToken(mutatedToken);
      await expect(promise).rejects.toThrowError('invalid signature');
    });
  });

  describe('lib errors', () => {
    type Spy = jest.SpyInstance<any>;
    const signSpy = jest.spyOn(JsonWebToken, 'sign') as Spy;
    const verifySpy = jest.spyOn(JsonWebToken, 'verify') as Spy;

    it('should throw if Jwt.sign encounters an error', async () => {
      signSpy.mockImplementation((_payload, _secret, cb) => {
        cb(new Error('An error occurred'), null);
      });

      const promise = jwt.createToken({ value: 42 });

      await expect(promise).rejects.toThrowError('An error occurred');
    });

    it('should throw if Jwt.sign does not return a token', async () => {
      signSpy.mockImplementation((_payload, _secret, cb) => {
        cb(null, null);
      });

      const promise = jwt.createToken({ value: 42 });

      await expect(promise).rejects.toThrowError(
        'An error occurred while generating the token',
      );
    });

    it('should throw if Jwt.verify does not return a payload', async () => {
      verifySpy.mockImplementation((_token, _secret, cb) => {
        cb(null, null);
      });

      const promise = jwt.decodeToken('some_token');

      await expect(promise).rejects.toThrowError(
        'An error occurred while decoding the token',
      );
    });

    it('should throw if Jwt.verify returns a token from a previous version', async () => {
      verifySpy.mockImplementation((_token, _secret, cb) => {
        cb(null, { version: 0 });
      });

      const promise = jwt.decodeToken('some_token');

      await expect(promise).rejects.toThrowError('Token version mismatch');
    });
  });
});
