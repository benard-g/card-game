import { render } from '@testing-library/react';
import React from 'react';

import LoadingScreen from './LoadingScreen';

describe('components/LoadingScreen', () => {
  it('should render without error', () => {
    render(<LoadingScreen />);
  });
});
