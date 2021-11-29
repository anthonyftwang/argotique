import React from 'react';
import { API } from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import { listPostVotes, listPosts } from 'graphql/queries';
import PostList from 'components/PostList/PostList';

const HomePage = () => {
  async function fetchAllPosts() {
    const postData = await API.graphql({ query: listPosts });
    const user = await Auth.currentAuthenticatedUser();
    const likeData = await API.graphql({
      query: listPostVotes,
      variables: {
        filter: {
          userID: { eq: user.attributes.sub }
        }
      }
    });
    const posts = postData.data.listPosts.items.map(post => ({
      ...post,
      isLiked: likeData.data.listPostVotes.items.some(like => like.postID === post.id)
    }));
    return posts;
  }

  return (
    <div className="homePage">
      <PostList
        fetchPosts={fetchAllPosts}
        defaultSort={"Top"}
        showSort
        showAdd
      />
    </div>
  )
}

export default HomePage;