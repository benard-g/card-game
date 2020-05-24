import { render } from '@testing-library/react';
import React from 'react';

import GithubIcon from '.';

describe('components/icons/GithubIcon', () => {
  it('should use default css', () => {
    const { getByAltText } = render(<GithubIcon />);

    const githubImg = getByAltText('Github');

    expect(githubImg.className).toEqual('GithubIcon');
  });

  it('should allow css to be overridden', () => {
    const { getByAltText } = render(<GithubIcon className="my-style" />);

    const githubImg = getByAltText('Github');

    expect(githubImg.className).toEqual('GithubIcon my-style');
  });
});
