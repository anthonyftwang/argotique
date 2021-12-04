import React from 'react';
import { listAllPostsService } from 'services/Post/Post.service';
import { getCurrentUserService } from 'services/User/User.service';
import PostList from 'components/PostList/PostList';

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
