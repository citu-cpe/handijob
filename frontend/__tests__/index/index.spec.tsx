import { render, screen } from '@testing-library/react';
import { Landing } from '../../src/modules/index/components/Landing/Landing';

xdescribe('Home Page', () => {
  beforeEach(() => {
    render(<Landing />);
  });

  it('shows landing page', () => {
    const loginLink = screen.getByRole<HTMLAnchorElement>('link', {
      name: 'Log In',
    });

    const registerLink = screen.getByRole<HTMLAnchorElement>('link', {
      name: 'Register',
    });

    expect(loginLink).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
  });
});
