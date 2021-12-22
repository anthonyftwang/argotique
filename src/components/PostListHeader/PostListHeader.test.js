import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PostListHeader from 'components/PostListHeader';

it('renders header without any buttons', () => {
  const mockHandler = jest.fn();
  render(
    <PostListHeader
      titleText="List of argots"
      sortChangeHandler={mockHandler}
      addPostHandler={mockHandler}
    />
  );
  expect(screen.queryByText('List of argots')).toBeVisible();
  expect(
    screen.queryByRole('button', { name: 'sort argots' })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: 'new argot' })
  ).not.toBeInTheDocument();
});

it('renders clickable sort and add buttons', () => {
  const mockHandler = jest.fn();
  render(
    <PostListHeader
      titleText="List of argots"
      showSort
      showAdd
      sortChangeHandler={mockHandler}
      addPostHandler={mockHandler}
    />
  );
  expect(screen.getByRole('button', { name: 'sort argots' })).toBeEnabled();
  expect(screen.getByRole('button', { name: 'new argot' })).toBeEnabled();
});

it('expands menu to show sort options', () => {
  const mockHandler = jest.fn();
  render(
    <PostListHeader
      titleText="List of argots"
      showSort
      showAdd
      sortChangeHandler={mockHandler}
      addPostHandler={mockHandler}
    />
  );
  fireEvent.click(screen.getByRole('button', { name: 'sort argots' }));
  expect(screen.getByRole('menuitem', { name: 'top argots' })).toBeVisible();
  expect(
    screen.getByRole('menuitem', { name: 'top argots' })
  ).toHaveTextContent('Top');
  expect(screen.getByRole('menuitem', { name: 'new argots' })).toBeVisible();
  expect(
    screen.getByRole('menuitem', { name: 'new argots' })
  ).toHaveTextContent('New');
  expect(screen.getByRole('menuitem', { name: 'active argots' })).toBeVisible();
  expect(
    screen.getByRole('menuitem', { name: 'active argots' })
  ).toHaveTextContent('Active');
});

it('calls sortChange and addPost handlers', () => {
  const sortChangeHandler = jest.fn();
  const addPostHandler = jest.fn();
  render(
    <PostListHeader
      titleText="List of argots"
      showSort
      showAdd
      sortChangeHandler={sortChangeHandler}
      addPostHandler={addPostHandler}
    />
  );
  fireEvent.click(screen.getByRole('button', { name: 'sort argots' }));
  fireEvent.click(screen.getByRole('menuitem', { name: 'top argots' }));
  fireEvent.click(screen.getByRole('button', { name: 'sort argots' }));
  fireEvent.click(screen.getByRole('menuitem', { name: 'new argots' }));
  fireEvent.click(screen.getByRole('button', { name: 'sort argots' }));
  fireEvent.click(screen.getByRole('menuitem', { name: 'active argots' }));
  expect(sortChangeHandler.mock.calls.length).toBe(3);
  expect(sortChangeHandler.mock.calls[0][0]).toBe('Top');
  expect(sortChangeHandler.mock.calls[1][0]).toBe('New');
  expect(sortChangeHandler.mock.calls[2][0]).toBe('Active');
  fireEvent.click(screen.getByRole('button', { name: 'new argot' }));
  expect(addPostHandler.mock.calls.length).toBe(1);
});
