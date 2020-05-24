import { render } from '@testing-library/react';
import React from 'react';

import LogoIcon from '.';

describe('components/icons/LogoIcon', () => {
  it('should use default css', () => {
    const { getByAltText } = render(<LogoIcon />);

    const logoImg = getByAltText('Logo');

    expect(logoImg.className).toEqual('LogoIcon');
  });

  it('should allow css to be overridden', () => {
    const { getByAltText } = render(<LogoIcon className="my-style" />);

    const logoImg = getByAltText('Logo');

    expect(logoImg.className).toEqual('LogoIcon my-style');
  });
});
