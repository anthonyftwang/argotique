import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from 'components/Loading';

it('renders post list skeleton', () => {
  render(<Loading isPreview />);
  expect(
    screen.getByRole('status', { name: 'post list loading' })
  ).toBeVisible();
});

it('renders post page skeleton', () => {
  render(<Loading isPreview={false} />);
  expect(
    screen.getByRole('status', { name: 'post page loading' })
  ).toBeVisible();
});
