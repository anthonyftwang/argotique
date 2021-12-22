import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import DrawerMenu from 'components/DrawerMenu';

it('renders drawer menu', () => {
  render(
    <MemoryRouter>
      <DrawerMenu username="user1234" />
    </MemoryRouter>
  );
  expect(screen.getByText('user1234')).toBeVisible();
  expect(screen.getByRole('button', { name: 'home page' })).toBeVisible();
  expect(screen.getByRole('button', { name: 'home page' })).toHaveTextContent(
    'Home page'
  );
  expect(screen.getByRole('button', { name: 'my argots' })).toBeVisible();
  expect(screen.getByRole('button', { name: 'my argots' })).toHaveTextContent(
    'My argots'
  );
  expect(screen.getByRole('button', { name: 'liked argots' })).toBeVisible();
  expect(
    screen.getByRole('button', { name: 'liked argots' })
  ).toHaveTextContent('Liked argots');
  expect(screen.getByRole('button', { name: 'about' })).toBeVisible();
  expect(screen.getByRole('button', { name: 'about' })).toHaveTextContent(
    'About'
  );
  expect(
    screen.getByRole('button', { name: 'terms and privacy' })
  ).toBeVisible();
  expect(
    screen.getByRole('button', { name: 'terms and privacy' })
  ).toHaveTextContent('Terms & Privacy');
  expect(screen.getByRole('button', { name: 'sign out' })).toBeVisible();
  expect(screen.getByRole('button', { name: 'sign out' })).toHaveTextContent(
    'Sign out'
  );
});
