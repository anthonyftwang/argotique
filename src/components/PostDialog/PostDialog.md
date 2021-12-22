_Note that the dialog will close only when `Cancel` is pressed and not on backdrop clicks; this is intentional so as to prevent accidental loss of large draft posts._

Example dialog for creating a new post:

```jsx
const [open, setOpen] = React.useState(false);
<div>
  <button type="button" onClick={() => setOpen(true)}>
    Show
  </button>
  <PostDialog
    open={open}
    onClose={() => setOpen(false)}
    onSubmitHandler={() => {
      alert('Post submitted!');
      setOpen(false);
    }}
  />
</div>;
```

Example dialog for editing an existing post:

```jsx
const [open, setOpen] = React.useState(false);
<div>
  <button type="button" onClick={() => setOpen(true)}>
    Show
  </button>
  <PostDialog
    open={open}
    onClose={() => setOpen(false)}
    onSubmitHandler={() => {
      alert('Post submitted!');
      setOpen(false);
    }}
    title="Existing title"
    subtitle="Existing subtitle"
    content="Existing content"
    newPost={false}
  />
</div>;
```
