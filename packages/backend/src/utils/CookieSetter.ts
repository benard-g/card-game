import { Response } from 'express';

export class CookieSetter {
  constructor(private readonly isDevMode: boolean) {}

  public setCookie(res: Response, key: string, value: string): void {
    if (this.isDevMode) {
      res.cookie(key, value);
    } else {
      res.cookie(key, value, { sameSite: 'none', secure: true });
    }
  }
}
