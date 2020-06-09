import React from 'react';

import { LoginForm } from '../LoginForm';
import { render } from 'test/wrapperRender';

afterEach(cleanup);

describe('Login Form', () => {
  it('has input fields and button', () => {
    const tree = render(<LoginForm />);
  });
});
