import { render } from '@testing-library/react';
import React from 'react';

import App from './App';

describe('app/App', () => {
  it('should render without error', () => {
    render(<App />);
  });
});
