import React from 'react';
import { render } from '@testing-library/react';

import { ThemeProvider } from 'components/Theme';
import { AuthContext } from 'context/AuthContext';
import { UserContext } from 'context/UserContext';

const providers = ({ children }) => {
  return (
    <AuthContext.Provider value={{}}>
      <ThemeProvider>
        <UserContext.Provider value={{}}>{children}</UserContext.Provider>
      </ThemeProvider>
    </AuthContext.Provider>
  );
};

const wrapperRender = (ui, options = {}) =>
  render(ui, { wrapper: providers, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { wrapperRender as render };
