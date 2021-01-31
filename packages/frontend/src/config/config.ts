function getNodeEnv() {
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'production';
    case 'test':
      return 'test';
    default:
      return 'development';
  }
}

export const config = {
  API_URI: process.env.REACT_APP_API_URI || 'http://localhost:8080',
  NODE_ENV: getNodeEnv(),
} as const;
