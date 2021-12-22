import React from 'react';
import { listLikedPostsService } from 'services/Post';
import { getCurrentUserService } from 'services/User';
import PostList from 'components/PostList';

function LikedPage() {
  const fetchLikedPosts = async () => {
    const user = await getCurrentUserService();
    const posts = await listLikedPostsService(user.id);
    return posts;
  };

  const makeTitleText = () => {
    return 'Liked argots';
  };

  return (
    <div className="likedPage">
      <PostList
        fetchPosts={fetchLikedPosts}
        defaultSort="New"
        makeTitleText={makeTitleText}
      />
    </div>
  );
}

export default LikedPage;
