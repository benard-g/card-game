import { render } from '@testing-library/react';
import React from 'react';

import GithubIcon from '.';

describe('components/icons/GithubIcon', () => {
  it('should render without errors', () => {
    render(<GithubIcon />);
  });
});
