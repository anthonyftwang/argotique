import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Nav } from './components/Nav.js';
import { HomePage } from './pages/HomePage.js';
import { PostPage } from './pages/PostPage.js';
import { UserPage } from './pages/UserPage.js';
import { BasePage } from './pages/BasePage.js';
import './App.css';

function App() {
  return (
    <Router basename="/">
      <div>
        <Nav />
        <main>
          <Routes>
            <Route path="/post/:id" element={<BasePage child={<PostPage />} key={Math.random()} />} />
            <Route path="/user/:id" element={<BasePage child={<UserPage />} key={Math.random()} />} />
            <Route path="/" element={<BasePage child={<HomePage />} key={Math.random()} />} />
            <Route path="*" render={() => <Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default withAuthenticator(App);

// import React, { useState, useEffect, useCallback } from 'react';
// import { API } from 'aws-amplify';
// import './App.css';
// import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
// import Auth from '@aws-amplify/auth';
// import { getPost, listPosts } from './graphql/queries';
// import { createPost as createPostMutation, deletePost as deletePostMutation } from './graphql/mutations';
// import { Post, Comment, User } from './models/index.js'

// const initialFormState = { title: '', subtitle: '' };

// function App() {
//   const [posts, setPosts] = useState([]);
//   const [formData, setFormData] = useState(initialFormState);

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   async function fetchPosts() {
//     const apiData = await API.graphql({ query: listPosts });
//     setPosts(apiData.data.listPosts.items);
//   }

//   async function createPost() {
//     if (!formData.title || !formData.subtitle) return;
//     let date = new Date();
//     let user = await Auth.currentAuthenticatedUser();
//     const params = {
//       title: formData.title,
//       subtitle: formData.subtitle,
//       createdAt: date.toISOString(),
//       updatedAt: date.toISOString(),
//       lastActivityAt: date.toISOString(),
//       votes: 0,
//       userID: user.attributes.sub
//     };
//     await API.graphql({ query: createPostMutation, variables: { input: params } });
//     setPosts([ ...posts, formData ]);
//     setFormData(initialFormState);
//   }

//   async function deletePost({ id }) {
//     const newPostsArray = posts.filter(post => post.id !== id);
//     setPosts(newPostsArray);
//     await API.graphql({ query: deletePostMutation, variables: { input: { id } }});
//   }

//   return (
//     <div className="App">
//       <h1>View All Posts</h1>
//       <input
//         onChange={e => setFormData({ ...formData, 'title': e.target.value})}
//         placeholder="Post title"
//         value={formData.title}
//       />
//       <input
//         onChange={e => setFormData({ ...formData, 'subtitle': e.target.value})}
//         placeholder="Post subtitle"
//         value={formData.subtitle}
//       />
//       <button onClick={createPost}>Create Post</button>
//       <div style={{marginBottom: 30}}>
//         {
//           posts.map(post => (
//             <div key={post.id || post.title}>
//               <h2>{post.title}</h2>
//               <p>{post.subtitle}</p>
//               <button onClick={() => deletePost(post)}>Delete Post</button>
//             </div>
//           ))
//         }
//       </div>
//       <AmplifySignOut />
//     </div>
//   );
// }

// export default withAuthenticator(App);
