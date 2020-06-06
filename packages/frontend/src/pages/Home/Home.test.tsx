import { render } from '@testing-library/react';
import React from 'react';

import Home from './Home';

describe('pages/Home', () => {
  it('should render Home without error', async () => {
    render(<Home />);
  });
});
