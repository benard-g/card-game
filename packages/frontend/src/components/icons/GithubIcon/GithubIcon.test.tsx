import { render } from '@testing-library/react';
import React from 'react';

import GithubIcon from './GithubIcon';

describe('components/icons/GithubIcon', () => {
  it('should render without errors', () => {
    render(<GithubIcon />);
  });
});
