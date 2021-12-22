import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { listUserPostsService } from 'services/Post/Post.service';
import {
  getCurrentUserService,
  getUserByNameService,
} from 'services/User/User.service';
import PostList from 'components/PostList/PostList';

function UserPage() {
  const location = useLocation();
  const [owner, setOwner] = useState(`${location.pathname.split('/').pop()}'s`);

  const fetchPostsByUser = async () => {
    const user = await getCurrentUserService();
    const ownerName = location.pathname.split('/').pop();
    const ownerData = await getUserByNameService(ownerName);
    if (!ownerData) {
      return [];
    }
    // dynamically generate page heading
    setOwner(ownerData.id === user.id ? 'My' : `${ownerName}'s`);
    const posts = await listUserPostsService(ownerData.id);
    return posts;
  };

  const makeTitleText = () => {
    return `${owner} argots`;
  };

  return (
    <div className="userPage">
      <PostList
        fetchPosts={fetchPostsByUser}
        defaultSort="New"
        showAdd={owner === 'My'}
        makeTitleText={makeTitleText}
      />
    </div>
  );
}

export default UserPage;
