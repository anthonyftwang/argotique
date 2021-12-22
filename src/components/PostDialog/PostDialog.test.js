import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PostDialog from 'components/PostDialog';

it('renders new post dialog', () => {
  const mockHandler = jest.fn();
  render(
    <PostDialog open onClose={mockHandler} onSubmitHandler={mockHandler} />
  );
  expect(screen.getByRole('heading')).toHaveTextContent('New argot');
  expect(screen.getByRole('form')).toHaveFormValues({
    title: '',
    subtitle: '',
    content: '',
  });
});

it('renders edit post dialog', () => {
  const mockHandler = jest.fn();
  render(
    <PostDialog
      open
      onClose={mockHandler}
      onSubmitHandler={mockHandler}
      title="Existing title"
      subtitle="Existing subtitle"
      content="Existing content"
      newPost={false}
    />
  );
  expect(screen.getByRole('heading')).toHaveTextContent('Edit argot');
  expect(screen.getByRole('form')).toHaveFormValues({
    title: 'Existing title',
    subtitle: 'Existing subtitle',
    content: 'Existing content',
  });
});

it('validates form input', async () => {
  const mockHandler = jest.fn();
  render(
    <PostDialog open onClose={mockHandler} onSubmitHandler={mockHandler} />
  );
  expect(screen.getByRole('button', { name: 'submit post' })).toBeDisabled();
  const titleField = screen.getByLabelText('French expression *');
  const subtitleField = screen.getByLabelText('English translation *');
  fireEvent.change(subtitleField, { target: { value: 'a' } });
  // formik bug
  await waitFor(() =>
    expect(screen.getByRole('button', { name: 'submit post' })).toBeEnabled()
  );
  fireEvent.change(titleField, { target: { value: 'a'.repeat(151) } });
  // formik bug
  await waitFor(() =>
    expect(screen.getByRole('button', { name: 'submit post' })).toBeDisabled()
  );
});
