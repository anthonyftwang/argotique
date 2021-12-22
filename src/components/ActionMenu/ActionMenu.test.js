import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ActionMenu from 'components/ActionMenu';

it('renders clickable menu button', () => {
  render(<ActionMenu isOwnedByUser={false} />);
  expect(screen.getByRole('button', { name: 'more actions' })).toBeEnabled();
});

it('expands to show edit and delete options', () => {
  render(<ActionMenu isOwnedByUser={false} />);
  fireEvent.click(screen.getByRole('button', { name: 'more actions' }));
  expect(screen.getByRole('menuitem', { name: 'edit argot' })).toBeVisible();
  expect(
    screen.getByRole('menuitem', { name: 'edit argot' })
  ).toHaveTextContent('Edit argot');
  expect(screen.getByRole('menuitem', { name: 'delete argot' })).toBeVisible();
  expect(
    screen.getByRole('menuitem', { name: 'delete argot' })
  ).toHaveTextContent('Delete argot');
});

it('disables items if not isOwnedByUser', () => {
  render(<ActionMenu isOwnedByUser={false} />);
  fireEvent.click(screen.getByRole('button', { name: 'more actions' }));
  expect(screen.getByRole('menuitem', { name: 'edit argot' })).toHaveAttribute(
    'aria-disabled'
  );
  expect(
    screen.getByRole('menuitem', { name: 'delete argot' })
  ).toHaveAttribute('aria-disabled');
});

it('enables items if isOwnedByUser', () => {
  const mockHandler = jest.fn();
  render(
    <ActionMenu
      isOwnedByUser
      editPostHandler={mockHandler}
      deletePostHandler={mockHandler}
    />
  );
  fireEvent.click(screen.getByRole('button', { name: 'more actions' }));
  expect(
    screen.getByRole('menuitem', { name: 'edit argot' })
  ).not.toHaveAttribute('aria-disabled');
  expect(
    screen.getByRole('menuitem', { name: 'delete argot' })
  ).not.toHaveAttribute('aria-disabled');
});
