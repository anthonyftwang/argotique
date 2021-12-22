import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CommentForm from 'components/CommentForm';

it('renders comment header with form', () => {
  const mockHandler = jest.fn();
  render(<CommentForm onSubmitHandler={mockHandler} />);
  expect(screen.getByRole('heading')).toHaveTextContent('Discussion');
  fireEvent.click(
    screen.getByRole('button', { name: 'expand to submit a comment' })
  );
  const inputField = screen.getByPlaceholderText('Write a comment...');
  expect(inputField).toBeVisible();
  expect(inputField).toHaveTextContent('');
});

it('validates form input', async () => {
  const mockHandler = jest.fn();
  render(<CommentForm onSubmitHandler={mockHandler} />);
  fireEvent.click(
    screen.getByRole('button', { name: 'expand to submit a comment' })
  );
  const inputField = screen.getByPlaceholderText('Write a comment...');
  const submitButton = screen.getByRole('button', { name: 'submit comment' });
  expect(submitButton).toBeDisabled();
  fireEvent.change(inputField, { target: { value: 'a' } });
  // formik bug
  await waitFor(() =>
    expect(screen.getByRole('button', { name: 'submit comment' })).toBeEnabled()
  );
  fireEvent.change(inputField, { target: { value: 'a'.repeat(301) } });
  // formik bug
  await waitFor(() =>
    expect(
      screen.getByRole('button', { name: 'submit comment' })
    ).toBeDisabled()
  );
});
