This component persistently floats right in desktop browsers, and is hidden in a sliding hamburger drawer on mobile devices.

Example menu:

```jsx
import { MemoryRouter } from 'react-router';

<MemoryRouter>
  <DrawerMenu
    username="user1234"
    handleDrawerItemClick={() => alert('Collapse the side drawer...')}
  />
</MemoryRouter>;
```
