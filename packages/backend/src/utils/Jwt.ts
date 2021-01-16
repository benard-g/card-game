import JsonWebToken from 'jsonwebtoken';

type TPayload = Record<string, any>;

export class Jwt {
  constructor(private readonly secretKey: string) {}

  public async createToken<T extends TPayload>(payload: T): Promise<string> {
    return new Promise((resolve, reject) =>
      JsonWebToken.sign(payload, this.secretKey, (err, token) => {
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
      JsonWebToken.verify(token, this.secretKey, (err, payload) => {
        if (err) {
          reject(err);
        } else if (!payload) {
          reject(new Error('An error occurred while decoding the token'));
        } else {
          resolve(payload as T);
        }
      }),
    );
  }
}
