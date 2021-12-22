import React from 'react';
import { render, screen } from '@testing-library/react';
import DeleteDialog from 'components/DeleteDialog';

it('renders delete dialog', () => {
  const mockHandler = jest.fn();
  render(
    <DeleteDialog open onClose={mockHandler} onSubmitHandler={mockHandler} />
  );
  expect(screen.getByRole('heading')).toHaveTextContent('Delete post?');
  expect(screen.getByText('This action cannot be undone.')).toBeVisible();
  expect(
    screen.getByRole('button', { name: 'cancel delete' })
  ).toHaveTextContent('Cancel');
  expect(screen.getByRole('button', { name: 'cancel delete' })).toBeEnabled();
  expect(
    screen.getByRole('button', { name: 'confirm delete' })
  ).toHaveTextContent('Delete');
  expect(screen.getByRole('button', { name: 'cancel delete' })).toBeEnabled();
});
