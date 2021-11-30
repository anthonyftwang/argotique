import React from 'react';
import { API } from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import { listPostVotes, listPosts } from 'graphql/queries';
import PostList from 'components/PostList/PostList';

function LikedPage() {
  const fetchLikedPosts = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const likeData = await API.graphql({
      query: listPostVotes,
      variables: {
        filter: {
          userID: { eq: user.attributes.sub },
        },
      },
    });
    const likedIDs = likeData.data.listPostVotes.items.map(
      (like) => like.postID
    );
    const likedFilter = likedIDs.map((likeID) => ({
      id: { eq: likeID },
    }));
    const postData = await API.graphql({
      query: listPosts,
      variables: {
        filter: {
          or: likedFilter,
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
