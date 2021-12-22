Post preview for lists:

```jsx
import { MemoryRouter } from 'react-router';

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
</MemoryRouter>;
```

Post details for standalone pages:

```jsx
import { MemoryRouter } from 'react-router';

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
    editPostHandler={() => alert('Editing argot...')}
    deletePostHandler={() => alert('Deleting argot...')}
  />
</MemoryRouter>;
```
