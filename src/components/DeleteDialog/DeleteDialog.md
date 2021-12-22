Example delete dialog:

```jsx
const [open, setOpen] = React.useState(false);
<div>
  <button type="button" onClick={() => setOpen(true)}>
    Show
  </button>
  <DeleteDialog
    open={open}
    onClose={() => setOpen(false)}
    onSubmitHandler={() => {
      alert('Delete confirmed!');
      setOpen(false);
    }}
  />
</div>;
```
