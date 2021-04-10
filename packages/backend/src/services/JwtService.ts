import JsonWebToken from 'jsonwebtoken';

const TOKEN_CURRENT_VERSION = 1;

type TPayload = Record<string, any>;

type TPayloadWrapper = {
  version: number;
  payload: TPayload;
};

export class JwtService {
  constructor(private readonly secretKey: string) {}

  public async createToken<T extends TPayload>(payload: T): Promise<string> {
    const payloadWrapper: TPayloadWrapper = {
      version: TOKEN_CURRENT_VERSION,
      payload,
    };
    return new Promise((resolve, reject) =>
      JsonWebToken.sign(payloadWrapper, this.secretKey, (err, token) => {
        if (err) {
          reject(err);
        } else if (!token) {
          reject(new Error('An error occurred while generating the token'));
        } else {
          resolve(token);
        }
      }),
    );
  }

  public async decodeToken<T extends TPayload>(token: string): Promise<T> {
    return new Promise((resolve, reject) =>
      JsonWebToken.verify(token, this.secretKey, (err, decoded) => {
        if (err) {
          reject(err);
        } else if (!decoded) {
          reject(new Error('An error occurred while decoding the token'));
        } else {
          const payloadWrapper = decoded as TPayloadWrapper;
          if (payloadWrapper.version !== TOKEN_CURRENT_VERSION) {
            reject(new Error('Token version mismatch'));
          }
          resolve(payloadWrapper.payload as T);
        }
      }),
    );
  }
}
