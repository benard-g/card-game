import { Response } from 'express';

type CookieObject = Record<string, string>;

export class CookieService {
  constructor(private readonly isDevMode: boolean) {}

  public parseCookieString(cookieString: string) {
    return cookieString
      .split('; ')
      .reduce<CookieObject>((cookieObject, keyValue) => {
        const [key, value] = keyValue.split('=');
        cookieObject[key] = value;
        return cookieObject;
      }, {});
  }

  public setCookieInResponse(res: Response, key: string, value: string): void {
    if (this.isDevMode) {
      res.cookie(key, value);
    } else {
      res.cookie(key, value, { sameSite: 'none', secure: true });
    }
  }
}
