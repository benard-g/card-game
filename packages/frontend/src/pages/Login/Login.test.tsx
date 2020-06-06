import { render } from '@testing-library/react';
import React from 'react';

import Login from './Login';

describe('pages/Login', () => {
  it('should render Login without error', async () => {
    render(<Login />);
  });
});
