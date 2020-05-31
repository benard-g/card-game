import { render } from '@testing-library/react';
import React from 'react';

import LogoIcon from '.';

describe('components/icons/LogoIcon', () => {
  it('should render without error', () => {
    render(<LogoIcon />);
  });
});
