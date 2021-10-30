import React, { useState, useEffect } from 'react';
// import { API } from 'aws-amplify';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import Auth from '@aws-amplify/auth';
// import { getPost, listPosts } from './graphql/queries';
// import { createPost as createPostMutation, deletePost as deletePostMutation } from './graphql/mutations';
import { DataStore } from 'aws-amplify';
import { Post, Comment, User } from './models/index.js'

const initialFormState = { title: '', subtitle: '' };

function App() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    // const apiData = await API.graphql({ query: listPosts });
    // setPosts(apiData.data.listPosts.items);
    const posts = await DataStore.query(Post);
    setPosts(posts);
  }

  async function createPost() {
    if (!formData.title || !formData.subtitle) return;
    let date = new Date();
    let user = await Auth.currentAuthenticatedUser();
    // const params = {
    //   title: formData.title,
    //   subtitle: formData.subtitle,
    //   createdAt: date.toISOString(),
    //   updatedAt: date.toISOString(),
    //   lastActivityAt: date.toISOString(),
    //   votes: 0,
    //   userID: user.attributes.sub
    // };
    // await API.graphql({ query: createPostMutation, variables: { input: params } });
    await DataStore.save(
      new Post({
        title: formData.title,
        subtitle: formData.subtitle,
        createdAt: date.toISOString(),
        updatedAt: date.toISOString(),
        lastActivityAt: date.toISOString(),
        votes: 0,
        userID: user.attributes.sub
      })
    );
    setPosts([ ...posts, formData ]);
    setFormData(initialFormState);
  }

  async function deletePost({ id }) {
    const newPostsArray = posts.filter(post => post.id !== id);
    setPosts(newPostsArray);
    // const apiData = await API.graphql({ query: getPost, variables: { id } });
    // const _version = apiData.data.getPost._version;
    // await API.graphql({ query: deletePostMutation, variables: { input: { id, _version } }});
    const postToDelete = await DataStore.query(Post, id);
    DataStore.delete(postToDelete);
  }

  return (
    <div className="App">
      <h1>View All Posts</h1>
      <input
        onChange={e => setFormData({ ...formData, 'title': e.target.value})}
        placeholder="Post title"
        value={formData.title}
      />
      <input
        onChange={e => setFormData({ ...formData, 'subtitle': e.target.value})}
        placeholder="Post subtitle"
        value={formData.subtitle}
      />
      <button onClick={createPost}>Create Post</button>
      <div style={{marginBottom: 30}}>
        {
          posts.map(post => (
            <div key={post.id || post.title}>
              <h2>{post.title}</h2>
              <p>{post.subtitle}</p>
              <button onClick={() => deletePost(post)}>Delete Post</button>
            </div>
          ))
        }
      </div>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
