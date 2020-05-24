import { render } from '@testing-library/react';
import React from 'react';

import Footer from '.';

describe('components/Footer', () => {
  it('should render without error', () => {
    render(<Footer />);
  });
});
