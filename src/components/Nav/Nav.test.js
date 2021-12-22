import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Nav from 'components/Nav';

it('renders toolbar with app title', () => {
  render(
    <MemoryRouter>
      <Nav username="user1234" />
    </MemoryRouter>
  );
  expect(screen.getByRole('banner')).toBeVisible();
  expect(screen.getByRole('banner')).toHaveTextContent('Argotique');
});

it('renders MobileDrawer when screen is less than 900px', () => {
  window.matchMedia = jest.fn().mockImplementation((query) => {
    return {
      matches:
        // eslint-disable-next-line no-unneeded-ternary
        query === '(min-width: 0px) and (max-width: 899px)' ? false : true,
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  });
  render(
    <MemoryRouter>
      <Nav username="user1234" />
    </MemoryRouter>
  );
  const toggle = screen.getByRole('button', { name: 'toggle drawer' });
  expect(screen.getByRole('banner')).toContainElement(toggle);
});
