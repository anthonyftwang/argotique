import React from 'react';
import { listAllPostsService } from 'services/Post';
import { getCurrentUserService } from 'services/User';
import PostList from 'components/PostList';

function HomePage() {
  const fetchAllPosts = async () => {
    const user = await getCurrentUserService();
    const posts = await listAllPostsService(user.id);
    return posts;
  };

  return (
    <div className="homePage">
      <PostList fetchPosts={fetchAllPosts} defaultSort="Top" showSort showAdd />
    </div>
  );
}

export default HomePage;
