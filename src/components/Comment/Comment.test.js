import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Comment from 'components/Comment';

it('renders comment card', () => {
  render(
    <MemoryRouter>
      <Comment
        content="This is an example comment!"
        username="user1234"
        contentAge="3 days ago"
      />
    </MemoryRouter>
  );
  expect(screen.getByRole('link', { name: 'comment author' })).toBeVisible();
  expect(screen.getByText('3 days ago')).toBeVisible();
  expect(screen.getByText('This is an example comment!')).toBeVisible();
});
