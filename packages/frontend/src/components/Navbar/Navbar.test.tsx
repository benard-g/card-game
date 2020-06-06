import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Navbar from './NavBar';

describe('components/Navbar', () => {
  it('should render without error', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );
  });
});
