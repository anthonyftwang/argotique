import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { API } from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import { listPostVotes, listPosts, listUsers } from 'graphql/queries';
import PostList from 'components/PostList/PostList';

function UserPage() {
  const location = useLocation();
  const [owner, setOwner] = useState(`${location.pathname.split('/').pop()}'s`);

  const fetchPostsByUser = async () => {
    const user = await Auth.currentAuthenticatedUser();
    // Need owner's userID from their username... first get all users
    const ownerName = location.pathname.split('/').pop();
    const ownerDataList = await API.graphql({
      query: listUsers,
      variables: {
        filter: {
          name: { eq: ownerName },
        },
      },
    });
    // Then match the userID to a user from the list
    // (exactly one item in this list, so same as items[0])
    const ownerData = ownerDataList.data.listUsers.items.find(
      (userObj) => userObj.name === ownerName
    );
    if (!ownerData) {
      return [];
    }
    const ownerID = ownerData.id;
    // ... (make name a primary key????)
    // set owner state variable ("My" | ${user}"'s")
    // to dynamically generate page heading
    setOwner(ownerID === user.attributes.sub ? 'My' : `${ownerName}'s`);
    // Finally, get posts filtered by owner's userID
    const postData = await API.graphql({
      query: listPosts,
      variables: {
        filter: {
          userID: { eq: ownerID },
        },
      },
    });
    const likeData = await API.graphql({
      query: listPostVotes,
      variables: {
        filter: {
          userID: { eq: user.attributes.sub },
        },
      },
    });
    const posts = postData.data.listPosts.items.map((post) => ({
      ...post,
      isLiked: likeData.data.listPostVotes.items.some(
        (like) => like.postID === post.id
      ),
    }));
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
