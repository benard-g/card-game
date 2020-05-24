import { render } from '@testing-library/react';
import React from 'react';

import Navbar from '.';

describe('components/Navbar', () => {
  it('should render without error', () => {
    render(<Navbar />);
  });
});
