For posts not owned by the current user:

```jsx
<ActionMenu isOwnedByUser={false} />
```

For posts submitted by the current user:

```jsx
<ActionMenu
  isOwnedByUser
  editPostHandler={() => alert('Editing argot...')}
  deletePostHandler={() => alert('Deleting argot...')}
/>
```
