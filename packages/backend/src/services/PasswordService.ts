import Bcrypt from 'bcrypt';

import { Service } from './Service';

export class PasswordService extends Service {
  public static NAME = 'password';

  public static SALT = 10;

  public cipherPassword(password: string): Promise<string> {
    return Bcrypt.hash(password, PasswordService.SALT);
  }

  public validatePassword(hash: string, password: string): Promise<boolean> {
    return Bcrypt.compare(password, hash);
  }
}
