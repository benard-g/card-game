import { PasswordService } from '../../../src/services/PasswordService';

describe('services/PasswordService', () => {
  it('should cipher the password correctly', async () => {
    const passwordService = new PasswordService();
    const password = 'password';

    const cipheredPassword = await passwordService.cipherPassword(password);

    expect(cipheredPassword).not.toEqual(password);
  });

  it('should validate a password matching the hash', async () => {
    const passwordService = new PasswordService();
    const password = 'password';

    const cipheredPassword = await passwordService.cipherPassword(password);

    const result = await passwordService.validatePassword(
      cipheredPassword,
      password,
    );

    expect(result).toBe(true);
  });

  it('should reject a non-matching password', async () => {
    const passwordService = new PasswordService();
    const password = 'password';

    const cipheredPassword = await passwordService.cipherPassword(password);

    const result = await passwordService.validatePassword(
      cipheredPassword,
      'another password',
    );

    expect(result).toBe(false);
  });

  it('should reject when comparing with the hash itself', async () => {
    const passwordService = new PasswordService();
    const password = 'password';

    const cipheredPassword = await passwordService.cipherPassword(password);

    const result = await passwordService.validatePassword(
      cipheredPassword,
      cipheredPassword,
    );

    expect(result).toBe(false);
  });

  it('should reject if the arguments are in the wrong order', async () => {
    const passwordService = new PasswordService();
    const password = 'password';

    const cipheredPassword = await passwordService.cipherPassword(password);

    const result = await passwordService.validatePassword(
      password,
      cipheredPassword,
    );

    expect(result).toBe(false);
  });
});
