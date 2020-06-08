import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { ThemeProvider } from 'components/Theme';
import { Search } from '../Search';

afterEach(cleanup);

describe('Notification Component', () => {
  it('renders component', () => {
    const { getByPlaceholderText } = render(
      <ThemeProvider>
        <Search />
      </ThemeProvider>
    );

    expect(getByPlaceholderText('Search')).toBeDefined();
  });
});
