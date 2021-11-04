import { render, screen } from '@testing-library/react';
import { Landing } from '../../src/modules/index/components/Landing/Landing';

describe('Home Page', () => {
  beforeEach(() => {
    render(<Landing />);
  });

  it('shows landing page', () => {
    const heading = screen.getByRole<HTMLHeadingElement>('heading', {
      name: /handijob/i,
    });

    const loginLink = screen.getByRole<HTMLAnchorElement>('link', {
      name: 'Log In',
    });

    const registerLink = screen.getByRole<HTMLAnchorElement>('link', {
      name: 'Register',
    });

    expect(heading).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
  });
});
