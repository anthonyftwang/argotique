import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Post from 'components/Post';

it('renders post preview', () => {
  render(
    <MemoryRouter>
      <Post
        isPreview
        id="example-post-id-0"
        username="user1234"
        title="French expression"
        subtitle="English translation"
        content="This is an example post!"
        voteCount={45}
        commentCount={8}
        contentAge="5 hours ago"
        isLiked
      />
    </MemoryRouter>
  );
  expect(screen.getByRole('link', { name: 'post author' })).toBeVisible();
  expect(screen.getByText('5 hours ago')).toBeVisible();
  expect(screen.getByRole('heading', { name: 'post title' })).toHaveTextContent(
    'French expression'
  );
  expect(screen.queryByText('English translation')).not.toBeInTheDocument();
  expect(
    screen.queryByText('This is an example post!')
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: 'post metrics' })
  ).toHaveTextContent('45 likes · 8 comments');
});

it('renders post details', () => {
  const mockHandler = jest.fn();
  render(
    <MemoryRouter>
      <Post
        isPreview={false}
        id="example-post-id-0"
        username="user1234"
        title="French expression"
        subtitle="English translation"
        content="This is an example post!"
        voteCount={45}
        commentCount={8}
        contentAge="5 hours ago"
        isLiked={false}
        isOwnedByUser
        editPostHandler={mockHandler}
        deletePostHandler={mockHandler}
      />
    </MemoryRouter>
  );
  expect(screen.getByRole('link', { name: 'post author' })).toBeVisible();
  expect(screen.getByText('5 hours ago')).toBeVisible();
  expect(screen.getByRole('heading', { name: 'post title' })).toHaveTextContent(
    'French expression 🇫🇷'
  );
  expect(
    screen.getByRole('heading', { name: 'post subtitle' })
  ).toHaveTextContent('English translation 🇬🇧');
  expect(screen.getByText('This is an example post!')).toBeVisible();
  expect(
    screen.getByRole('heading', { name: 'post metrics' })
  ).toHaveTextContent('45 likes · 8 comments');
});
