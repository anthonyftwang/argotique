import React from 'react';
import { listLikedPostsService } from 'services/Post/Post.service';
import { getCurrentUserService } from 'services/User/User.service';
import PostList from 'components/PostList/PostList';

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
