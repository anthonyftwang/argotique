import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import MobileDrawer from 'components/MobileDrawer';

it('renders clickable drawer button', () => {
  render(
    <MemoryRouter>
      <MobileDrawer username="user1234" />
    </MemoryRouter>
  );
  expect(screen.getByRole('button', { name: 'toggle drawer' })).toBeEnabled();
});

it('opens side drawer when toggle button pressed', () => {
  render(
    <MemoryRouter>
      <MobileDrawer username="user1234" />
    </MemoryRouter>
  );
  fireEvent.click(screen.getByRole('button', { name: 'toggle drawer' }));
  expect(screen.getByRole('navigation', { name: 'drawer menu' })).toBeVisible();
});
