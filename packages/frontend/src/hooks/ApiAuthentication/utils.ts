import { config } from '../../config';

export async function authenticateUser() {
  const authUri = `${config.API_URI}/api/auth/authenticate`;
  return fetch(authUri, { method: 'POST', credentials: 'include' });
}
